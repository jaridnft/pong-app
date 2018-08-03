import { SVG_NS, CONFIG } from '../settings';

export default class Ball {
  constructor(radius, boardWidth, boardHeight) {
    this.radius = radius;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.direction = CONFIG.direction;
    // set initial position of ball
    this.reset();
  }

  reset() {
    this.x = this.boardWidth / 2;
    this.y = this.boardHeight / 2;

    this.vy = 0; // solves corner case for when vy is randomly assigned 0
    while (this.vy === 0) {
      this.vy = Math.floor(Math.random() * 10 - 5); // Math.random() returns number [0,1]
    }
    this.vx = this.direction * (6 - Math.abs(this.vy)); // since 6 > 5, x value will always be positive
  }

  collisionDetect() {
    const hitLeft = this.x - this.radius <= 0;
    const hitRight = this.x + this.radius >= this.boardWidth;
    const hitTop = this.y - this.radius <= 0;
    const hitBottom = this.y + this.radius >= this.boardHeight;
    if (hitLeft || hitRight) {
      this.vx = -this.vx;
    }
    else if (hitTop || hitBottom) {
      this.vy = -this.vy;
    }
  }

  render(svg) { 
    this.x += this.vx;
    this.y += this.vy;

    this.collisionDetect();

    // draw ball
    let ball = document.createElementNS( SVG_NS, 'circle');
    ball.setAttributeNS(null, 'r', this.radius);
    ball.setAttributeNS(null, 'cx', this.x); // controls ball movement
    ball.setAttributeNS(null, 'cy', this.y); // controls ball movement
    ball.setAttributeNS(null, 'stroke', 'white');
    ball.setAttributeNS(null, 'fill', 'white');
    ball.setAttributeNS(null, 'id', 'ball');

    // add ball to game
    svg.appendChild(ball);
  }
}

// TODO reset ball