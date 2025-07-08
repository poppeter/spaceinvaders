class Barrier extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'barrier');
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setImmovable(true);
    this.maxHealth = 4;
    this.health = this.maxHealth;
    this.updateFrame();
  }
  damage() {
    this.health--;
    if (this.health <= 0) {
      this.disableBody(true, true);
    } else {
      this.updateFrame();
    }
  }
  updateFrame() {
    // Placeholder: tint based on health
    const tints = [0x333333, 0x888888, 0xcccccc, 0xffffff];
    this.setTint(tints[this.health - 1] || 0x333333);
  }
  reset() {
    this.enableBody(true, this.x, this.y, true, true);
    this.health = this.maxHealth;
    this.updateFrame();
  }
}

export default class BarrierGroup {
  constructor(scene) {
    this.scene = scene;
    this.group = scene.physics.add.group();
    this.createBarriers();
  }
  createBarriers() {
    this.group.clear(true, true);
    const count = 4, offsetY = this.scene.scale.height - 180, gap = this.scene.scale.width / (count + 1);
    for (let i = 1; i <= count; i++) {
      let x = gap * i;
      let barrier = new Barrier(this.scene, x, offsetY);
      this.group.add(barrier);
    }
  }
  update(time, delta) {
    // No-op for now
  }
  reset() {
    this.group.children.iterate(barrier => {
      if (barrier) barrier.reset();
    });
  }
} 