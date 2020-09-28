import Phaser from 'phaser';

class Entity extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, key, type) {
    super(scene, x, y, key);
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this, 0);
    this.setData('type', type);
    this.setData('isDead', false);
    this.setData('numberOfLives', 1);
  }

  explode(canDestroy) {
    if (!this.getData('isDead')) {
      this.setData('isDead', true);
      this.setTexture('animationExplosion');
      this.play('animationExplosion');
      this.scene.sfx.explosions[
        Phaser.Math.Between(0, this.scene.sfx.explosions.length - 1)
      ].play();

      if (this.shootTimer !== undefined) {
        if (this.shootTimer) {
          this.shootTimer.remove(false);
        }
      }
      this.body.setVelocity(0, 0);
      this.on('animationcomplete', () => {
        if ((canDestroy)) {
          this.destroy();
        } else {
          this.setVisible(false);
        }
      }, this);
    }
  }
}

export default Entity;