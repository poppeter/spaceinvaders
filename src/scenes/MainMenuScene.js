// Main menu scene with start button and high score display
import Phaser from 'phaser';

export default class MainMenuScene extends Phaser.Scene {
  constructor() {
    super('MainMenu');
  }

  create() {
    const { width, height } = this.scale;
    const title = this.add.text(width / 2, height / 2 - 100, 'SPACE INVADERS', {
      fontSize: '48px',
      color: '#ffffff',
      fontFamily: 'Arial',
    }).setOrigin(0.5);

    const highScore = localStorage.getItem('highScore') || 0;
    this.add.text(width / 2, height / 2 - 40, `High Score: ${highScore}`, {
      fontSize: '24px',
      color: '#ffffff',
      fontFamily: 'Arial',
    }).setOrigin(0.5);

    const startButton = this.add.text(width / 2, height / 2 + 40, 'START GAME', {
      fontSize: '32px',
      color: '#00ff00',
      fontFamily: 'Arial',
      backgroundColor: '#000000',
      padding: { x: 10, y: 5 },
    })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => this.startGame());

    this.input.keyboard.once('keydown-SPACE', () => this.startGame());
  }

  startGame() {
    this.scene.start('Game');
  }
}
