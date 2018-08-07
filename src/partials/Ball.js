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
    
    this.checkWallCollision();
    
    if (this.hitTop || this.hitBottom) {  // ie. wall collision
      this.vy = -this.vy;
    }
    
    this.paddleCollision(player1, player2);
    
    if (this.rightPaddleCollided) { // ie. this is called until another paddle hits or a reset
      this.backspin(player2, svg);
    } else if (this.leftPaddleCollided){
      this.backspin(player1, svg);
    }
    
    this.hotOffThePaddle = false;
    
    this.rightGoal = this.x + this.radius >= this.boardWidth;
    this.leftGoal = this.x - this.radius <= 0;
    
    if (this.rightGoal) {
      this.goal(player1);
    } else if (this.leftGoal) {
      this.goal(player2);
    }
    
    // solves corner condition when backspin completely removes x component
    if (this.vx === 0) {
      this.vx = (Math.floor(Math.random() * 4));
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
      this.vy = (Math.floor(Math.random() * 4.5)); // Math.random() returns number [0,1]
    }
    this.vx = this.plusOrMinus * (6 - Math.abs(this.vy)); // since 6 > 5, x value will always be positive
  }
  
  goal (player) {
    player.score++;
    this.reset();
  }
  
  checkWallCollision () {
    this.hitTop = this.y - this.radius <= 0;
    this.hitBottom = this.y + this.radius >= this.boardHeight;
  }
  
  paddleCollision(player1, player2) {
    if (this.vx > 0) {
      let paddle = player2.coordinates(player2.x, player2.y, player2.width, player2.height); // returns an array with coordinates for paddle in space
      let [leftX, rightX, topY, bottomY] = paddle;
      
      if ((this.x + this.radius >= leftX) && 
      (this.x + this.radius <= rightX) &&
      (this.y >= topY) && 
      (this.y <= bottomY)) {
        this.vx = -this.vx - CONFIG.ballSpeedIncrease;
        if (this.vy > 0) {   // on paddle collision ball speed increases
          this.vy += CONFIG.ballSpeedIncrease;  
        } else if (this.vy < 0) {
          this.vy -= CONFIG.ballSpeedIncrease;
        }
        
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
      (this.y + this.radius >= topY && this.y - this.radius <= bottomY)) {
        this.vx = -this.vx + CONFIG.ballSpeedIncrease;
        if (this.vy > 0) {   // on paddle collision ball speed increases
          this.vy += CONFIG.ballSpeedIncrease;  
        } else if (this.vy < 0) {
          this.vy -= CONFIG.ballSpeedIncrease;
        }
         
        this.ping.play();
        this.leftPaddleCollided = true;
        this.rightPaddleCollided = false;
        this.hotOffThePaddle = true;
      } else {
        this.vx = this.vx;
      }   
    }
  }

  backspin(player, svg) {            // this function will only alter ball path if this.ballSpinConstant > 0
    if (this.hotOffThePaddle) { 
      this.ballSpinConstant = CONFIG.spinConst * player.speedDelta;
      this.previousSpin = this.ballSpinConstant;
      this.hotOffThePaddle = !this.hotOffThePaddle;
      this.bounceDecay = 2;
    }

    let spinVectorX = this.vy * this.ballSpinConstant;   // to create a 'spin' we have to apply a vector perpendicular to [vx, vy]
    let spinVectorY = -this.vx * this.ballSpinConstant; // by definition, this vector is [vy, -vx]

    if (player.player === 'player2') {             // logic to reverse backspin direction depending on paddle side
      this.vx += spinVectorX;  
      this.vy += spinVectorY; 
    } else {
      this.vx -= spinVectorX;
      this.vy -= spinVectorY;
    }
    
    // ballSpinConstant needs to go to 0, or else you can create a perfect circle instead of arc
    // CONFIG.spinDecay < 1, and here we set directly to 0 when it gets sufficiently small
    if (this.ballSpinConstant > 0.0001) {
      this.ballSpinConstant *= CONFIG.spinDecay;
    } else if (this.ballSpinConstant < -0.0001) {
      this.ballSpinConstant *= CONFIG.spinDecay;
    } else {
      this.ballSpinConstant = 0; 
    }

    let backspinText = document.createElementNS( SVG_NS, 'text');
    backspinText.setAttributeNS(null, 'font-family', 'Silkscreen Web');
    backspinText.setAttributeNS(null, 'font-size', this.size);
    backspinText.setAttributeNS(null, 'fill', 'white');
    if (this.rightPaddleCollided) {
      backspinText.setAttributeNS(null, 'x', (0.78 * this.boardWidth));
    } else if (this.leftPaddleCollided) {
      backspinText.setAttributeNS(null, 'x', (0.1 * this.boardWidth));
    }
    backspinText.setAttributeNS(null, 'y', 15);
    svg.appendChild(backspinText);

    if (this.ballSpinConstant !== 0) {
      backspinText.textContent = 'backspin!';

      if (this.hitTop || this.hitBottom) {        // if we hit a wall and there's still backspin 
         this.ballSpinConstant = this.bounceDecay * this.previousSpin; // reapply the backspin
         this.bounceDecay *= 0.8;
      } 
      if (this.bounceDecay < 1.2) { // only a max of 2 bounces is allowed
        this.ballSpinConstant = 0;
      }
    } else {
      backspinText.textContent = '';
    }
  }
}

