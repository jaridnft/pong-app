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

  goal (player) {
    player.score++;
    this.reset();
  }

  wallCollision() {
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

  paddleCollision(player1, player2){
    if (this.vx > 0) {
      let paddle = player2.coordinates(player2.x, player2.y, player2.width, player2.height); // returns an array with coordinates for paddle in space
      let [leftX, rightX, topY, bottomY] = paddle;

      if ((this.x + this.radius >= leftX) && 
          (this.x + this.radius <= rightX) &&
          (this.y >= topY && this.y <= bottomY)) {
        this.vx = -this.vx;
      } else {
        this.vx = this.vx;
      }

    } else {
      let paddle = player1.coordinates(player1.x, player1.y, player1.width, player1.height); // returns an array with coordinates for paddle in space
      let [leftX, rightX, topY, bottomY] = paddle;

      if ((this.x - this.radius <= rightX) && 
      (this.x - this.radius >= leftX) &&
      (this.y >= topY && this.y <= bottomY)) {
        this.vx = -this.vx;
        this.vy = -this.vy;
      } else {
        this.vx = this.vx;
        this.vy = this.vy;
      }
    }
  } 

  render(svg, player1, player2) { 
    this.x += this.vx;
    this.y += this.vy;

    this.wallCollision();
    this.paddleCollision(player1, player2);

    const rightGoal = this.x + this.radius >= this.boardWidth;
    const leftGoal = this.x - this.radius <= 0;
    if (rightGoal) {
      this.goal(player1);
      this.direction = -1;
    } else if (leftGoal) {
      this.goal(player2);
      this.direction = 1;
    }

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