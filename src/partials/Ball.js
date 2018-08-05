import { SVG_NS, CONFIG } from '../settings';

export default class Ball {
  constructor(radius, boardWidth, boardHeight) {
    this.radius = radius;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    
    // set initial position of ball
    this.reset();
    
    this.ping = new Audio('public/sounds/pong-01.wav');
  }
  
  render(svg, player1, player2) { 
    this.x += this.vx;
    this.y += this.vy;

    this.wallCollision();
    this.paddleCollision(player1, player2);

    if (this.rightPaddleCollided) { //TODO this bools are being cleared too early
      this.backspin(player2);
    } else if (this.leftPaddleCollided){
      this.backspin(player1);
    }

    this.hotOffThePaddle = false;

    this.rightGoal = this.x + this.radius >= this.boardWidth;
    this.leftGoal = this.x - this.radius <= 0;

    if (this.rightGoal) {
      this.goal(player1);
    } else if (this.leftGoal) {
      this.goal(player2);
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

  reset() {
    if (this.rightGoal) {
      this.plusOrMinus = 1; // sends ball to opposite side after goal
    } else if (this.leftGoal) {
      this.plusOrMinus = -1;
    } else {
      this.plusOrMinus = Math.random() < 0.51 ? -1 : 1; // will be -1 or 1 to start
    }

    this.rightPaddleCollided = false;
    this.leftPaddleCollided = false;

    this.x = this.boardWidth / 2;
    this.y = this.boardHeight / 2;

    this.vy = 0; // this solves corner case for when vy is randomly assigned 0
    while (this.vy === 0) {
      this.vy = (Math.floor(Math.random() * 5)); // Math.random() returns number [0,1]
    }
    this.vx = this.plusOrMinus * (5.5 - Math.abs(this.vy)); // since 5.5 > 5, x value will always be positive
  }

  goal (player) {
    player.score++;
    this.reset();
  }

  wallCollision() {
    this.rightPaddleCollided = false;
    this.leftPaddleCollided = false;
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
        this.ping.play();
        this.rightPaddleCollided = true;
        this.leftPaddleCollided = false;
        this.hotOffThePaddle = true;
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
        this.ping.play();
        this.leftPaddleCollided = true;
        this.rightPaddleCollided = false;
        this.hotOffThePaddle = true;
      } else {
        this.vx = this.vx;
      }
      
    }
  }

  backspin(player) {
    if (this.hotOffThePaddle) { 
      this.ballSpinConstant = CONFIG.spinConst * player.speedDelta;
      this.hotOffThePaddle = !this.hotOffThePaddle;
    }

    
    let pastVx = this.vx;
    this.vx += this.vy * this.ballSpinConstant;
    this.vy += (-pastVx * this.ballSpinConstant);
    
    console.log(`speedDelta: ${player.speedDelta}, ballSpinConstant: ${this.ballSpinConstant}`);
    console.log(`vy: ${this.vy}, vx: ${this.vx}`);

    this.ballSpinConstant -= 0.0025;
    this.ballSpinConstant = Math.min(0, this.ballSpinConstant);
    // ballSpinConstant needs to decrease to 0
  }
}

// TODO reset velocities on collisions