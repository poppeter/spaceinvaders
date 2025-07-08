export default class Player {
  constructor(scene, x, y) {
    this.scene = scene;
    this.sprite = scene.physics.add.sprite(x, y, 'player');
    this.sprite.setCollideWorldBounds(true);
    this.sprite.setScale(0.4); // Make player ship even smaller
    this.speed = 320;
    this.shootCooldown = 150; // Reduced from 350ms to 150ms for faster firing
    this.lastShot = 0;
    this.cursors = scene.input.keyboard.createCursorKeys();
    this.spaceKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.isAlive = true;
    this.autoFireActive = false;
  }

  update(time, delta) {
    if (!this.isAlive) return;
    let move = 0;
    if (this.cursors.left.isDown) move = -1;
    else if (this.cursors.right.isDown) move = 1;
    this.sprite.setVelocityX(move * this.speed);
    
    // Handle auto-fire
    if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
      this.autoFireActive = true;
      this.shoot(time);
    } else if (Phaser.Input.Keyboard.JustUp(this.spaceKey)) {
      this.autoFireActive = false;
    }
    
    // Auto-fire when space is held
    if (this.autoFireActive && this.spaceKey.isDown) {
      this.shoot(time);
    }
  }

  shoot(time) {
    if (time - this.lastShot < this.shootCooldown) return;
    this.lastShot = time;
    this.scene.bullets.firePlayerBullet(this.sprite.x, this.sprite.y - 32);
    this.scene.sound.play('shoot');
  }

  respawn() {
    this.isAlive = false;
    this.sprite.setVisible(false);
    this.scene.time.delayedCall(1000, () => {
      this.sprite.setPosition(this.scene.scale.width/2, this.scene.scale.height - 80);
      this.sprite.setVisible(true);
      this.isAlive = true;
    });
  }

  reset() {
    this.sprite.setPosition(this.scene.scale.width/2, this.scene.scale.height - 80);
    this.isAlive = true;
    this.sprite.setVisible(true);
  }
} 