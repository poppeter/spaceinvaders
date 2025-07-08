export default class UIManager {
  constructor(scene) {
    this.scene = scene;
    this.scoreText = scene.add.text(32, 24, 'Score: 0', {
      fontFamily: 'monospace',
      fontSize: '28px',
      color: '#fff',
      stroke: '#000',
      strokeThickness: 4,
    }).setScrollFactor(0).setDepth(10);
    this.livesText = scene.add.text(32, 64, 'Lives: 3', {
      fontFamily: 'monospace',
      fontSize: '28px',
      color: '#fff',
      stroke: '#000',
      strokeThickness: 4,
    }).setScrollFactor(0).setDepth(10);
    this.highScoreText = scene.add.text(scene.scale.width - 32, 24, 'High Score: 0', {
      fontFamily: 'monospace',
      fontSize: '28px',
      color: '#2e8fff',
      stroke: '#000',
      strokeThickness: 4,
      align: 'right',
    }).setOrigin(1, 0).setScrollFactor(0).setDepth(10);
    // Pause overlay
    this.pauseOverlay = scene.add.rectangle(scene.scale.width/2, scene.scale.height/2, scene.scale.width, scene.scale.height, 0x000000, 0.7)
      .setDepth(100).setVisible(false);
    this.pauseText = scene.add.text(scene.scale.width/2, scene.scale.height/2, 'PAUSED', {
      fontFamily: 'monospace',
      fontSize: '64px',
      color: '#fff',
      align: 'center',
      stroke: '#000',
      strokeThickness: 8,
    }).setOrigin(0.5).setDepth(101).setVisible(false);
  }

  updateScore(score) {
    this.scoreText.setText(`Score: ${score}`);
  }

  updateLives(lives) {
    this.livesText.setText(`Lives: ${lives}`);
  }

  updateHighScore(highScore) {
    this.highScoreText.setText(`High Score: ${highScore}`);
  }

  showPause() {
    this.pauseOverlay.setVisible(true);
    this.pauseText.setVisible(true);
  }

  hidePause() {
    this.pauseOverlay.setVisible(false);
    this.pauseText.setVisible(false);
  }

  update(time, delta) {
    // No-op for now
  }
} 