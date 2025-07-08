export default class BulletManager {
  constructor(scene, player, aliens) {
    this.scene = scene;
    this.player = player;
    this.aliens = aliens;
    this.playerBullets = scene.physics.add.group();
    this.alienBullets = scene.physics.add.group();
  }

  firePlayerBullet(x, y) {
    let bullet = this.scene.physics.add.image(x, y, 'bullet');
    this.playerBullets.add(bullet);
    
    // Player bullet styling
    bullet.setTint(0x00ffff); // Cyan color
    bullet.setScale(0.8);
    
    // Add glow effect as separate object
    let glow = this.scene.add.graphics();
    glow.lineStyle(3, 0x00ffff, 0.8);
    glow.strokeCircle(x, y, 8);
    glow.setDepth(bullet.depth - 1);
    
    // Create trail effect
    let trail = this.scene.add.graphics();
    trail.setDepth(bullet.depth - 1);
    
    bullet.setVelocityY(-480);
    bullet.setCollideWorldBounds(false);
    
    // Store effects for cleanup
    bullet.glowEffect = glow;
    bullet.trailEffect = trail;
    bullet.trailPoints = [];
    
    // Update trail every frame
    bullet.updateTrail = () => {
      if (bullet.active) {
        // Add current position to trail
        bullet.trailPoints.push({ x: bullet.x, y: bullet.y, alpha: 1 });
        
        // Keep only last 10 points
        if (bullet.trailPoints.length > 10) {
          bullet.trailPoints.shift();
        }
        
        // Draw trail
        trail.clear();
        trail.lineStyle(2, 0x00ffff, 0.6);
        trail.beginPath();
        
        for (let i = 0; i < bullet.trailPoints.length; i++) {
          let point = bullet.trailPoints[i];
          let alpha = point.alpha * (i / bullet.trailPoints.length);
          trail.lineStyle(2, 0x00ffff, alpha);
          
          if (i === 0) {
            trail.moveTo(point.x, point.y);
          } else {
            trail.lineTo(point.x, point.y);
          }
        }
        trail.strokePath();
        
        // Fade trail points
        bullet.trailPoints.forEach(point => {
          point.alpha *= 0.9;
        });
      }
    };
  }

  fireAlienBullet(x, y) {
    let bullet = this.scene.physics.add.image(x, y, 'alienBullet');
    this.alienBullets.add(bullet);
    
    // Alien bullet styling
    bullet.setTint(0xff4444); // Red color
    bullet.setScale(0.6);
    
    // Add glow effect as separate object
    let glow = this.scene.add.graphics();
    glow.lineStyle(2, 0xff4444, 0.7);
    glow.strokeCircle(x, y, 6);
    glow.setDepth(bullet.depth - 1);
    
    // Add pulse effect
    this.scene.tweens.add({
      targets: bullet,
      scaleX: 1.2,
      scaleY: 1.2,
      duration: 200,
      yoyo: true,
      repeat: -1
    });
    
    bullet.setVelocityY(320);
    bullet.setCollideWorldBounds(false);
    
    // Store effect for cleanup
    bullet.glowEffect = glow;
  }

  update(time, delta) {
    // Update bullet trails
    this.playerBullets.children.each(bullet => {
      if (bullet.active && bullet.updateTrail) {
        bullet.updateTrail();
      }
    });
    
    // Clean up off-screen bullets and their effects
    this.playerBullets.children.each(bullet => {
      if (bullet.active && bullet.y < -50) {
        if (bullet.glowEffect) bullet.glowEffect.destroy();
        if (bullet.trailEffect) bullet.trailEffect.destroy();
        bullet.destroy();
      }
    });
    this.alienBullets.children.each(bullet => {
      if (bullet.active && bullet.y > this.scene.scale.height + 50) {
        if (bullet.glowEffect) bullet.glowEffect.destroy();
        bullet.destroy();
      }
    });
  }

  reset() {
    // Clean up all effects before clearing
    this.playerBullets.children.each(bullet => {
      if (bullet.glowEffect) bullet.glowEffect.destroy();
      if (bullet.trailEffect) bullet.trailEffect.destroy();
    });
    this.alienBullets.children.each(bullet => {
      if (bullet.glowEffect) bullet.glowEffect.destroy();
    });
    
    this.playerBullets.clear(true, true);
    this.alienBullets.clear(true, true);
  }
} 