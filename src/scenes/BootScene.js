// BootScene loads assets and generates textures
import Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    // Generate simple textures using graphics
    const graphics = this.make.graphics({ x: 0, y: 0, add: false });

    // Player texture
    graphics.fillStyle(0x00ff00);
    graphics.fillRect(0, 0, 40, 20);
    graphics.generateTexture('player', 40, 20);
    graphics.clear();

    // Alien texture
    graphics.fillStyle(0xffffff);
    graphics.fillRect(0, 0, 30, 20);
    graphics.generateTexture('alien', 30, 20);
    graphics.clear();

    // Bullet texture
    graphics.fillStyle(0xff0000);
    graphics.fillRect(0, 0, 4, 10);
    graphics.generateTexture('bullet', 4, 10);
    graphics.clear();

    // Alien bullet texture
    graphics.fillStyle(0xffff00);
    graphics.fillRect(0, 0, 4, 10);
    graphics.generateTexture('alienBullet', 4, 10);
    graphics.clear();

    // Shield texture
    graphics.fillStyle(0x00ffff);
    graphics.fillRect(0, 0, 60, 40);
    graphics.generateTexture('shield', 60, 40);
    graphics.destroy();
  }

  create() {
    this.scene.start('MainMenu');
  }
}
