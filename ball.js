class Ball {
  /**
   *
   * @param {Number} x  圆心的x坐标
   * @param {Number} y  圆心的y坐标
   * @param {Number} vx x轴方向的速度
   * @param {Number} vy y轴方向的速度
   * @param {Number} radius  圆的半径
   * @param {String} color  圆的颜色
   */
  constructor(x, y, vx, vy, radius, color) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.radius = radius;
    this.color = color;
  }

  //画球的方法
  //context作为参数传入 为了方便实用
  draw(context) {
    //开始画画
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    context.closePath();
    context.fillStyle = this.color;
    context.fill();
  }
  //球移动的方法
  move() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x <= this.radius || this.x >= 800 - this.radius) {
      this.vx *= -1;
    }
    if (this.y <= this.radius || this.y >= 600 - this.radius) {
      this.vy *= -1;
    }
  }
  //判断碰撞的方法
  isCollision(other) {
    //other代表其它的小球
    const dx = this.x - other.x;
    const dy = this.y - other.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < this.radius + other.radius) {
      //如果两个圆心之间的距离小于两个球半径之和 说明撞了
      return true;
    }
    //意味着没撞
    return false;
  }
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function randomColor() {
  return (
    'rgb(' +
    random(0, 255) +
    ', ' +
    random(0, 255) +
    ', ' +
    random(0, 255) +
    ')'
  );
}

class Game {
  constructor() {
    // 声明一个空数组 用来存放小球
    this.balls = [];
    for (let i = 0; i < 10; i++) {
      //球的出现的位置 移动的方向 大小 颜色都随机
      let ball = new Ball(
        random(200, 600),
        random(200, 400),
        random(-10, 10),
        random(-10, 10),
        random(10, 20),
        randomColor()
      );
      this.balls.push(ball);
    }
  }
  start() {
    setInterval(() => {
      context.fillStyle = 'rgba(0,0,0,0.1)';
      context.fillRect(0, 0, 800, 600);
      //开始遍历小球
      this.balls.forEach((ball) => {
        //改变球的圆心坐标
        //移动小球
        ball.move();
        //画小球
        ball.draw(context);
        //判断小球是否相撞 如果撞了改变颜色
        this.balls.forEach((other) => {
          if (other === ball) {
            return;
          }
          if (ball.isCollision(other)) {
            other.color = ball.color = randomColor();
          }
        });
      });
    }, 30);
  }
}


//使用教程
let cvs = document.getElementById('cvs');
let context = cvs.getContext('2d');
let g = new Game();
g.start();
