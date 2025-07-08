export default class MainMenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainMenuScene' });
  }

  create() {
    const { width, height } = this.scale;
    this.add.rectangle(width/2, height/2, width, height, 0x222b3a).setDepth(-1);
    this.add.text(width/2, height/2 - 120, 'SPACE INVADERS', {
      fontFamily: 'monospace',
      fontSize: '64px',
      color: '#2e8fff',
      fontStyle: 'bold',
      align: 'center',
      stroke: '#000',
      strokeThickness: 8,
    }).setOrigin(0.5);
    const highScore = localStorage.getItem('spaceinvaders_highscore') || 0;
    this.add.text(width/2, height/2 - 40, `High Score: ${highScore}`, {
      fontFamily: 'monospace',
      fontSize: '32px',
      color: '#fff',
      align: 'center',
    }).setOrigin(0.5);
    const startBtn = this.add.text(width/2, height/2 + 60, 'START GAME', {
      fontFamily: 'monospace',
      fontSize: '40px',
      color: '#fff',
      backgroundColor: '#2e8fff',
      padding: { x: 32, y: 12 },
      borderRadius: 8,
      align: 'center',
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });
    startBtn.on('pointerdown', () => {
      this.scene.start('GameScene');
    });
    this.input.keyboard.once('keydown-SPACE', () => {
      this.scene.start('GameScene');
    });
  }
} 