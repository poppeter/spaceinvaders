import Player from '../sprites/Player.js';
import AlienGroup from '../sprites/AlienGroup.js';
import BulletManager from '../sprites/BulletManager.js';
import BarrierGroup from '../sprites/BarrierGroup.js';
import UIManager from '../ui/UIManager.js';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
    this.score = 0;
    this.lives = 3;
    this.level = 1;
    this.highScore = 0;
  }

  create() {
    // Background
    this.add.image(0, 0, 'background').setOrigin(0).setDisplaySize(this.scale.width, this.scale.height);
    // Music - completely removed
    // this.bgm = this.sound.add('bgm', { loop: true, volume: 0.15 });
    // this.bgm.play();
    // State
    this.score = 0;
    this.lives = 3;
    this.level = 1;
    this.highScore = parseInt(localStorage.getItem('spaceinvaders_highscore') || '0', 10);
    // UI
    this.ui = new UIManager(this);
    this.ui.updateScore(this.score);
    this.ui.updateLives(this.lives);
    this.ui.updateHighScore(this.highScore);
    // Player
    this.player = new Player(this, this.scale.width/2, this.scale.height - 80);
    // Barriers
    this.barriers = new BarrierGroup(this);
    // Aliens
    this.aliens = new AlienGroup(this, this.level);
    // Bullets
    this.bullets = new BulletManager(this, this.player, this.aliens);
    // Colliders
    this.physics.add.collider(this.bullets.playerBullets, this.aliens.group, this.handleAlienHit, null, this);
    this.physics.add.collider(this.bullets.alienBullets, this.player.sprite, this.handlePlayerHit, null, this);
    this.physics.add.collider(this.bullets.playerBullets, this.barriers.group, this.handleBarrierHit, null, this);
    this.physics.add.collider(this.bullets.alienBullets, this.barriers.group, this.handleBarrierHit, null, this);
    // Pause
    this.input.keyboard.on('keydown-P', this.togglePause, this);
    // Game Over flag
    this.isGameOver = false;
  }

  handleAlienHit(bullet, alien) {
    // Create explosion effect at alien's position
    this.createExplosion(alien.x, alien.y);
    
    bullet.destroy();
    alien.hit();
    this.sound.play('explosion');
    
    // Very minimal screen shake
    this.cameras.main.shake(30, 0.002);
    
    this.score += alien.points;
    this.ui.updateScore(this.score);
    if (this.aliens.group.countActive(true) === 0) {
      this.nextLevel();
    }
  }

  handlePlayerHit(playerSprite, bullet) {
    // Create explosion effect at player's position
    this.createExplosion(playerSprite.x, playerSprite.y, 1.5); // Larger scale for player
    
    bullet.destroy();
    if (this.isGameOver) return;
    this.sound.play('player_explosion'); // Use player explosion sound
    
    // More dramatic screen shake for player hit
    this.cameras.main.shake(100, 0.01);
    
    this.lives--;
    this.ui.updateLives(this.lives);
    if (this.lives <= 0) {
      this.gameOver();
    } else {
      this.player.respawn();
    }
  }

  handleBarrierHit(bullet, barrier) {
    // Create small explosion effect at barrier's position
    this.createExplosion(barrier.x, barrier.y, 0.5); // Smaller scale for barriers
    
    bullet.destroy();
    if (barrier && typeof barrier.damage === 'function') {
      barrier.damage();
      this.sound.play('hit');
    }
  }

  createExplosion(x, y, scale = 1.0) {
    // Create explosion sprite
    let explosion = this.add.sprite(x, y, 'explosion_0');
    explosion.setScale(scale);
    explosion.setDepth(50); // Above other sprites
    
    // Create animation
    let frames = [];
    for (let i = 0; i <= 23; i++) {
      frames.push({ key: `explosion_${i}` });
    }
    
    // Play explosion animation
    this.anims.create({
      key: 'explode',
      frames: frames,
      frameRate: 24,
      repeat: 0
    });
    
    explosion.play('explode');
    
    // Remove sprite when animation completes
    explosion.once('animationcomplete', () => {
      explosion.destroy();
    });
  }

  nextLevel() {
    this.level++;
    this.aliens.reset(this.level);
    this.barriers.reset();
    this.player.reset();
    this.bullets.reset();
  }

  togglePause() {
    if (this.scene.isPaused()) {
      this.scene.resume();
      this.ui.hidePause();
    } else {
      this.scene.pause();
      this.ui.showPause();
    }
  }

  gameOver() {
    this.isGameOver = true;
    if (this.score > this.highScore) {
      localStorage.setItem('spaceinvaders_highscore', this.score);
    }
    this.time.delayedCall(1200, () => {
      this.scene.start('GameOverScene', { score: this.score });
    });
  }

  update(time, delta) {
    if (this.isGameOver) return;
    this.player.update(time, delta);
    this.aliens.update(time, delta);
    this.bullets.update(time, delta);
    this.barriers.update(time, delta);
    this.ui.update(time, delta);
  }
} 