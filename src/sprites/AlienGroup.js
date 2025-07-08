class Alien extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, type = 'alien', points = 10) {
    super(scene, x, y, type);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setImmovable(true);
    this.points = points;
    this.type = type;
    this.animationSpeed = 1000; // Animation frame rate in ms
    this.lastAnimationUpdate = 0;
    this.currentFrame = 1;
  }
  
  updateAnimation(time) {
    if (time - this.lastAnimationUpdate > this.animationSpeed) {
      this.currentFrame = this.currentFrame === 1 ? 2 : 1;
      this.setTexture(`${this.type}_${this.currentFrame}`);
      this.lastAnimationUpdate = time;
    }
  }
  
  hit() {
    this.disableBody(true, true);
    // Add explosion animation here if desired
  }
}

class BasicAlien extends Alien {
  constructor(scene, x, y) {
    super(scene, x, y, 'alien_blue', 10);
    this.setTint(0x00aaff); // Blue tint
    this.setScale(0.35); // Make even smaller
  }
}

class FastAlien extends Alien {
  constructor(scene, x, y) {
    super(scene, x, y, 'alien_green', 20);
    this.setTint(0x00ff00); // Green tint
    this.setScale(0.35); // Make even smaller
    this.animationSpeed = 600; // Faster animation for fast aliens
  }
}

class TankAlien extends Alien {
  constructor(scene, x, y) {
    super(scene, x, y, 'alien_red', 30);
    this.setTint(0xff0000); // Red tint
    this.setScale(0.5); // Bigger than basic but still smaller
    this.animationSpeed = 1200; // Slower animation for tank aliens
  }
}

class BossAlien extends Alien {
  constructor(scene, x, y) {
    super(scene, x, y, 'alien_black', 50);
    this.setTint(0xff00ff); // Purple tint
    this.setScale(0.65); // Much bigger than basic but smaller than original
    this.animationSpeed = 800; // Medium animation speed for boss aliens
  }
}

export default class AlienGroup {
  constructor(scene, level = 1) {
    this.scene = scene;
    this.level = level;
    this.speed = 40 + (level - 1) * 10;
    this.descendAmount = 32;
    this.shootInterval = Math.max(1200 - (level - 1) * 100, 400);
    this.group = scene.physics.add.group();
    this.createAliens();
    this.moveDir = 1;
    this.lastMove = 0;
    this.moveDelay = Math.max(600 - (level - 1) * 40, 120);
    this.lastShoot = 0;
    this.isDescending = false;
    this.descendStartTime = 0;
  }

  getAlienClass(level, row) {
    if (level >= 5) {
      // Level 5+: Mix of all types
      if (row === 0) return BossAlien;
      if (row === 1) return TankAlien;
      if (row === 2) return FastAlien;
      return BasicAlien;
    } else if (level >= 3) {
      // Level 3-4: Add tank aliens
      if (row === 0) return TankAlien;
      if (row === 1) return FastAlien;
      return BasicAlien;
    } else if (level >= 2) {
      // Level 2: Add fast aliens
      if (row === 0) return FastAlien;
      return BasicAlien;
    } else {
      // Level 1: Basic aliens only
      return BasicAlien;
    }
  }

  createAliens() {
    this.group.clear(true, true);
    const rows = 5, cols = 10, offsetX = 80, offsetY = 80, gapX = 56, gapY = 48;
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        let x = offsetX + col * gapX;
        let y = offsetY + row * gapY;
        let AlienClass = this.getAlienClass(this.level, row);
        let alien = new AlienClass(this.scene, x, y);
        this.group.add(alien);
      }
    }
  }

  update(time, delta) {
    // Update alien animations
    this.group.children.iterate(alien => {
      if (alien.active && alien.updateAnimation) {
        alien.updateAnimation(time);
      }
    });
    
    // Handle descending phase
    if (this.isDescending) {
      if (time - this.descendStartTime > 500) { // 500ms descend time
        this.isDescending = false;
        // Start moving in new direction
        this.group.children.iterate(alien => {
          if (alien.active) {
            alien.setVelocityX(this.moveDir * this.speed);
            alien.setVelocityY(0);
          }
        });
      }
      return; // Don't do other movement during descent
    }

    if (time - this.lastMove > this.moveDelay) {
      let reachedRightEdge = false;
      let reachedLeftEdge = false;
      
      this.group.children.iterate(alien => {
        if (!alien.active) return;
        if (alien.x > this.scene.scale.width - 40) reachedRightEdge = true;
        if (alien.x < 40) reachedLeftEdge = true;
      });
      
      if (reachedRightEdge && this.moveDir > 0) {
        // Descend when reaching right edge
        this.moveDir = -1;
        this.isDescending = true;
        this.descendStartTime = time;
        // Stop horizontal movement and start descending
        this.group.children.iterate(alien => {
          if (alien.active) {
            alien.setVelocityX(0);
            alien.setVelocityY(this.descendAmount * 2);
          }
        });
      } else if (reachedLeftEdge && this.moveDir < 0) {
        // Just reverse direction when reaching left edge (no descent)
        this.moveDir = 1;
        this.group.children.iterate(alien => {
          if (alien.active) {
            alien.setVelocityX(this.moveDir * this.speed);
            alien.setVelocityY(0);
          }
        });
      } else {
        // Set smooth horizontal velocity
        this.group.children.iterate(alien => {
          if (alien.active) {
            alien.setVelocityX(this.moveDir * this.speed);
            alien.setVelocityY(0);
          }
        });
      }
      this.lastMove = time;
    }
    
    // Alien shooting
    if (time - this.lastShoot > this.shootInterval) {
      let shooters = this.group.getChildren().filter(a => a.active);
      if (shooters.length > 0) {
        let shooter = Phaser.Utils.Array.GetRandom(shooters);
        this.scene.bullets.fireAlienBullet(shooter.x, shooter.y + 24);
      }
      this.lastShoot = time;
    }
  }

  reset(level = 1) {
    this.level = level;
    this.speed = 40 + (level - 1) * 10;
    this.shootInterval = Math.max(1200 - (level - 1) * 100, 400);
    this.moveDelay = Math.max(600 - (level - 1) * 40, 120);
    this.createAliens();
    this.moveDir = 1;
    this.lastMove = 0;
    this.lastShoot = 0;
    this.isDescending = false;
    this.descendStartTime = 0;
  }
} 