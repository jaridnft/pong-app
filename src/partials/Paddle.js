import { SVG_NS, CONFIG } from '../settings';

export default class Paddle {
  constructor(boardHeight, width, height, x, y, up, down, player) {
    this.boardHeight = boardHeight;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.currentSpeed = CONFIG.paddleVel;
    this.score = CONFIG.currentScore;
    this.accel = CONFIG.paddleAccel;

    this.player = player;
    this.keyState = {};
    this.pastSpeed = this.currentSpeed; // used to compute instantaneous velocity, initial value then is 0
   
    // document.addEventListener("keydown", event => {
    //   switch (event.key) {
    //     case up:
    //       this.moveUp();
    //       break;
    //     case down:
    //       this.moveDown();
    //       break;
    //   }
    // });

    document.addEventListener('keydown', event => {
      this.keyState[event.key || event.which] = true;
    }, true);

    document.addEventListener('keyup', event => {
      this.keyState[event.key || event.which] = false;
    }, true);
  }

  render(svg) { 
    // draw paddle
    let paddle = document.createElementNS( SVG_NS, 'rect');
    paddle.setAttributeNS(null, 'x', this.x);
    paddle.setAttributeNS(null, 'y', this.y);
    paddle.setAttributeNS(null, 'width', this.width);
    paddle.setAttributeNS(null, 'height', this.height);
    paddle.setAttributeNS(null, 'stroke', 'white');
    paddle.setAttributeNS(null, 'fill', 'white');
    
    // Player movement
    if (this.keyState['w'] && this.player === 'player1') {
      this.moveUp();
    }
    if (this.keyState['s'] && this.player === 'player1') {
      this.moveDown();
    }
    if (this.keyState['ArrowUp'] && this.player === 'player2') {
      this.moveUp();
    }
    if (this.keyState['ArrowDown'] && this.player === 'player2') {
      this.moveDown();
    }
    
    // paddle velocity resets, ie. remove accumulated acceleration
    if ((this.player === 'player1') && 
    (this.keyState['w'] == this.keyState['s'])) {   // this line is XNOR, ie. reset accel when both keys, or neither key is pressed
      this.currentSpeed = CONFIG.paddleVel;
    }
    if ((this.player === 'player2') &&
    (this.keyState['ArrowUp'] == this.keyState['ArrowDown'])) {
      this.currentSpeed = CONFIG.paddleVel;
    }

    // add paddle to game
    svg.appendChild(paddle);
  }

  moveUp() {

    this.currentSpeed += this.accel;
    this.y = Math.max(this.y - this.currentSpeed, this.width);
  }

  moveDown() {
    this.currentSpeed += this.accel;
    this.y = Math.min(this.y + this.currentSpeed, this.boardHeight - this.height - this.width);
  }

  coordinates(x, y, width, height) { // used for mapping collisions with ball
    let leftX = x;
    let rightX = x + width;
    let topY = y;
    let bottomY = y + height;
    return [leftX, rightX, topY, bottomY];
  }
}
