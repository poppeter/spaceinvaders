export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOverScene' });
  }

  init(data) {
    this.finalScore = data.score || 0;
    this.highScore = parseInt(localStorage.getItem('spaceinvaders_highscore') || '0', 10);
  }

  create() {
    const { width, height } = this.scale;
    this.add.rectangle(width/2, height/2, width, height, 0x222b3a).setDepth(-1);
    this.add.text(width/2, height/2 - 100, 'GAME OVER', {
      fontFamily: 'monospace',
      fontSize: '64px',
      color: '#ff3c41',
      fontStyle: 'bold',
      align: 'center',
      stroke: '#000',
      strokeThickness: 8,
    }).setOrigin(0.5);
    this.add.text(width/2, height/2, `Score: ${this.finalScore}`, {
      fontFamily: 'monospace',
      fontSize: '36px',
      color: '#fff',
      align: 'center',
    }).setOrigin(0.5);
    this.add.text(width/2, height/2 + 60, `High Score: ${this.highScore}`, {
      fontFamily: 'monospace',
      fontSize: '32px',
      color: '#2e8fff',
      align: 'center',
    }).setOrigin(0.5);
    const restartBtn = this.add.text(width/2, height/2 + 140, 'RESTART', {
      fontFamily: 'monospace',
      fontSize: '40px',
      color: '#fff',
      backgroundColor: '#2e8fff',
      padding: { x: 32, y: 12 },
      borderRadius: 8,
      align: 'center',
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });
    restartBtn.on('pointerdown', () => {
      this.scene.start('GameScene');
    });
    this.input.keyboard.once('keydown-SPACE', () => {
      this.scene.start('GameScene');
    });
  }
} 