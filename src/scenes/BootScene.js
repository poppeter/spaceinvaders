export default class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload() {
    // Kenney Space Shooter Redux assets
    this.load.image('player', 'assets/kenney_space-shooter-redux/PNG/playerShip1_blue.png');
    this.load.image('alien', 'assets/kenney_space-shooter-redux/PNG/Enemies/enemyBlue1.png');
    this.load.image('alien2', 'assets/kenney_space-shooter-redux/PNG/Enemies/enemyGreen1.png');
    this.load.image('alien3', 'assets/kenney_space-shooter-redux/PNG/Enemies/enemyRed1.png');
    this.load.image('alien4', 'assets/kenney_space-shooter-redux/PNG/Enemies/enemyBlack1.png');
    
    // Additional alien sprites for animations
    this.load.image('alien_blue_1', 'assets/kenney_space-shooter-redux/PNG/Enemies/enemyBlue1.png');
    this.load.image('alien_blue_2', 'assets/kenney_space-shooter-redux/PNG/Enemies/enemyBlue2.png');
    this.load.image('alien_green_1', 'assets/kenney_space-shooter-redux/PNG/Enemies/enemyGreen1.png');
    this.load.image('alien_green_2', 'assets/kenney_space-shooter-redux/PNG/Enemies/enemyGreen2.png');
    this.load.image('alien_red_1', 'assets/kenney_space-shooter-redux/PNG/Enemies/enemyRed1.png');
    this.load.image('alien_red_2', 'assets/kenney_space-shooter-redux/PNG/Enemies/enemyRed2.png');
    this.load.image('alien_black_1', 'assets/kenney_space-shooter-redux/PNG/Enemies/enemyBlack1.png');
    this.load.image('alien_black_2', 'assets/kenney_space-shooter-redux/PNG/Enemies/enemyBlack2.png');
    
    this.load.image('bullet', 'assets/kenney_space-shooter-redux/PNG/Lasers/laserBlue01.png');
    this.load.image('alienBullet', 'assets/kenney_space-shooter-redux/PNG/Lasers/laserRed01.png');
    this.load.image('barrier', 'assets/barrier.png');
    this.load.image('background', 'assets/background.png');
    
    // Load explosion sprites
    for (let i = 0; i <= 23; i++) {
      this.load.image(`explosion_${i}`, `assets/explosion/expl_11_${String(i).padStart(4, '0')}.png`);
    }
    
    // this.load.audio('bgm', 'assets/bgm.wav');
    this.load.audio('shoot', 'assets/gun-2.wav');
    this.load.audio('explosion', 'assets/explosion-2.wav');
    this.load.audio('player_explosion', 'assets/ship-explosion.wav');
    this.load.audio('barrier_explosion', 'assets/barrier-explosion.wav');
    this.load.audio('hit', 'assets/hit.wav');
    // Loading bar
    let width = this.cameras.main.width;
    let height = this.cameras.main.height;
    let progressBar = this.add.graphics();
    let progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(width/2 - 160, height/2 - 25, 320, 50);
    this.load.on('progress', (value) => {
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(width/2 - 150, height/2 - 15, 300 * value, 30);
    });
    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
    });
  }

  create() {
    this.scene.start('MainMenuScene');
  }
} 