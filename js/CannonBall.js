class CannonBall {
  constructor(x, y) {
    var options = {
      isStatic: true
    };
    this.w = 120;
    this.h=30;
    this.speed = 0.05;
    this.body = Bodies.rectangle(x, y, this.w,this.h, options);
    this.image = loadImage("arrow.png");
    this.animation = [this.image];
    this.trajectory = [];
    this.isSink = false;
    World.add(world, this.body);
  }

  animate() {
    this.speed += 0.05;
  }

  remove(index) {
    this.isSink = true;
    Matter.Body.setVelocity(this.body, { x: 0, y: 0 });

    this.animation = waterSplashAnimation;
    this.speed = 0.05;
    this.w = 120;
    this.h=30;
    setTimeout(() => {
      Matter.World.remove(world, this.body);
      delete balls[index];
    }, 1000);
  }

  shoot() {
    var newAngle = cannon.angle - 18;
    newAngle = newAngle *(3.14/180)
    var velocity = p5.Vector.fromAngle(newAngle);
    velocity.mult(0.5);
    Matter.Body.setStatic(this.body, false);
    Matter.Body.setVelocity(this.body, {
      x: velocity.x *(180/3.14), y: velocity.y * (180/3.14)});
  }

  display() {
    var angle = this.body.angle;
    var pos = this.body.position;
    var index = floor(this.speed % this.animation.length);

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    imageMode(CENTER);
    image(this.animation[index], 0, 0, this.w, this.h);
    pop();

    if (this.body.velocity.x > 0 && pos.x > 10 && !this.isSink) {
      var position = [pos.x, pos.y];
      this.trajectory.push(position);
    }

    for (var i = 0; i < this.trajectory.length; i++) {
      image(this.image, this.trajectory[i][0], this.trajectory[i][1], 5, 5);
    }
  }
}

