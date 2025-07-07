// Main gameplay scene handling player, aliens, shields and scoring
import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
    this.level = 1;
  }

  create() {
    const { width, height } = this.scale;

    this.score = 0;

    this.player = this.physics.add.image(width / 2, height - 40, 'player');
    this.player.setCollideWorldBounds(true);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.keys = this.input.keyboard.addKeys('A,D,SPACE,ESC');

    this.bullets = this.physics.add.group({
      defaultKey: 'bullet',
      maxSize: 20,
    });

    this.alienBullets = this.physics.add.group({
      defaultKey: 'alienBullet',
      maxSize: 30,
    });

    this.aliens = this.physics.add.group();
    this.createAliens();

    this.shields = this.physics.add.staticGroup();
    this.createShields();

    this.scoreText = this.add.text(10, 10, 'Score: 0', {
      fontSize: '20px',
      color: '#ffffff',
      fontFamily: 'Arial',
    });

    this.physics.add.overlap(this.bullets, this.aliens, this.hitAlien, null, this);
    this.physics.add.overlap(this.alienBullets, this.player, this.playerHit, null, this);
    this.physics.add.overlap(this.bullets, this.shields, this.bulletHitsShield, null, this);
    this.physics.add.overlap(this.alienBullets, this.shields, this.bulletHitsShield, null, this);

    this.alienVelocityX = 20;
    this.time.addEvent({ delay: 1000, callback: this.alienFire, callbackScope: this, loop: true });
  }

  createAliens() {
    const { width } = this.scale;
    const rows = 4 + this.level; // increase rows with level
    const cols = 10;
    const offsetX = 80;
    const offsetY = 80;
    const spacingX = 48;
    const spacingY = 40;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = offsetX + c * spacingX;
        const y = offsetY + r * spacingY;
        const alien = this.aliens.create(x, y, 'alien');
        alien.setImmovable(true);
      }
    }
  }

  createShields() {
    const { width, height } = this.scale;
    const positions = [width * 0.2, width * 0.4, width * 0.6, width * 0.8];
    positions.forEach(posX => {
      const shield = this.shields.create(posX, height - 100, 'shield');
      shield.setData('health', 6); // number of hits
    });
  }

  bulletHitsShield(bullet, shield) {
    bullet.destroy();
    const health = shield.getData('health') - 1;
    shield.setData('health', health);
    shield.setAlpha(health / 6);
    if (health <= 0) {
      shield.destroy();
    }
  }

  hitAlien(bullet, alien) {
    bullet.destroy();
    alien.destroy();
    // update score on alien hit
    this.score += 10;
    this.scoreText.setText(`Score: ${this.score}`);
    if (this.aliens.countActive() === 0) {
      this.level++;
      this.createAliens();
      this.alienVelocityX += 5;
    }
  }

  alienFire() {
    const aliens = this.aliens.getChildren();
    if (aliens.length === 0) return;
    const shooter = Phaser.Utils.Array.GetRandom(aliens);
    const bullet = this.alienBullets.get(shooter.x, shooter.y + 20);
    if (bullet) {
      bullet.setActive(true);
      bullet.setVisible(true);
      bullet.body.enable = true;
      bullet.setVelocityY(150 + this.level * 20);
    }
  }

  playerHit(player, bullet) {
    bullet.destroy();
    // end the game when the player is hit
    this.scene.start('GameOver', { score: this.score });
  }

  update(time, delta) {
    const speed = 200;
    if (this.cursors.left.isDown || this.keys.A.isDown) {
      this.player.setVelocityX(-speed);
    } else if (this.cursors.right.isDown || this.keys.D.isDown) {
      this.player.setVelocityX(speed);
    } else {
      this.player.setVelocityX(0);
    }

    if (Phaser.Input.Keyboard.JustDown(this.cursors.space) || Phaser.Input.Keyboard.JustDown(this.keys.SPACE)) {
      this.fireBullet();
    }

    if (Phaser.Input.Keyboard.JustDown(this.keys.ESC)) {
      this.togglePause();
    }

    // Move aliens as a group
    let shiftDown = false;
    this.aliens.children.iterate(alien => {
      alien.x += (this.alienVelocityX * delta) / 1000;
      if (alien.x >= this.scale.width - alien.width / 2 || alien.x <= alien.width / 2) {
        shiftDown = true;
      }
    });

    if (shiftDown) {
      this.alienVelocityX *= -1;
      this.aliens.children.iterate(alien => {
        alien.y += 10;
        if (alien.y > this.scale.height - 120) {
          // stop game if aliens reach the bottom
          this.scene.start('GameOver', { score: this.score });
        }
      });
    }
  }

  fireBullet() {
    const bullet = this.bullets.get(this.player.x, this.player.y - 20);
    if (bullet) {
      bullet.setActive(true);
      bullet.setVisible(true);
      bullet.body.enable = true;
      bullet.setVelocityY(-300);
    }
  }

  togglePause() {
    if (this.scene.isPaused()) {
      this.scene.resume();
      this.physics.resume();
    } else {
      this.scene.pause();
      this.physics.pause();
    }
  }
}
