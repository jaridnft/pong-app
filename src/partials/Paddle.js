import { SVG_NS, CONFIG } from '../settings';

export default class Paddle {
  constructor(boardHeight, width, height, x, y, up, down, player) {
    this.boardHeight = boardHeight;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.currentSpeed = CONFIG.paddleVel;
    this.score = 0;
    this.accel = CONFIG.paddleAccel;

    this.player = player;
    this.keyState = {};
    
    this.pastPos = y; // used to compute instantaneous velocity

    document.addEventListener('keydown', event => {
      this.keyState[event.key || event.which] = true;
    }, true);

    document.addEventListener('keyup', event => {
      this.keyState[event.key || event.which] = false;
    }, true);
  }

  render(svg) { 
    this.pastPos = this.y; // get last speed value before changing it

    this.moveDetect();

    // measure how far we've travelled between frames
    // positive for moving upwards, and negative for downwards
    // speedDelta is a float from +- [6.5, 18] 
    this.speedDelta = this.pastPos - this.y; // TODO: need to export this

    // draw paddle
    let paddle = document.createElementNS( SVG_NS, 'rect');
    paddle.setAttributeNS(null, 'x', this.x);
    paddle.setAttributeNS(null, 'y', this.y);
    paddle.setAttributeNS(null, 'width', this.width);
    paddle.setAttributeNS(null, 'height', this.height);
    paddle.setAttributeNS(null, 'stroke', 'white');
    paddle.setAttributeNS(null, 'fill', 'white');
    
    // add paddle to game
    svg.appendChild(paddle);
  }

  moveDetect() {
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
