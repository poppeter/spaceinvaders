// Game over scene showing final and high scores
import Phaser from 'phaser';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  init(data) {
    this.finalScore = data.score || 0;
  }

  create() {
    const { width, height } = this.scale;
    const highScore = localStorage.getItem('highScore') || 0;
    if (this.finalScore > highScore) {
      localStorage.setItem('highScore', this.finalScore);
    }

    this.add.text(width / 2, height / 2 - 100, 'GAME OVER', {
      fontSize: '48px',
      color: '#ff0000',
      fontFamily: 'Arial',
    }).setOrigin(0.5);

    this.add.text(width / 2, height / 2 - 40, `Score: ${this.finalScore}`, {
      fontSize: '24px',
      color: '#ffffff',
      fontFamily: 'Arial',
    }).setOrigin(0.5);

    const hs = localStorage.getItem('highScore') || 0;
    this.add.text(width / 2, height / 2, `High Score: ${hs}`, {
      fontSize: '24px',
      color: '#ffffff',
      fontFamily: 'Arial',
    }).setOrigin(0.5);

    const restart = this.add.text(width / 2, height / 2 + 60, 'RESTART', {
      fontSize: '32px',
      color: '#00ff00',
      fontFamily: 'Arial',
      backgroundColor: '#000000',
      padding: { x: 10, y: 5 },
    })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => this.scene.start('Game'));

    this.input.keyboard.once('keydown-SPACE', () => this.scene.start('Game'));
  }
}
