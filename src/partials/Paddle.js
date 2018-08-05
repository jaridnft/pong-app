import { SVG_NS, CONFIG } from '../settings';

export default class Paddle {
  constructor(boardHeight, width, height, x, y, up, down, player) {
    this.boardHeight = boardHeight;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.up = up;
    this.down = down;
    this.currentSpeed = CONFIG.paddleVel;
    this.score = 0;

    this.player = player;
    this.keyState = {};

    document.addEventListener('keydown', event => {
      this.keyState[event.key || event.which] = true;
    }, true);

    document.addEventListener('keyup', event => {
      this.keyState[event.key || event.which] = false;
    }, true);
  }

  render(svg) { 
    this.pastPos = this.y; // get last speed value before changing it, used to compute instantaneous velocity

    this.moveDetect();

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
    if (this.keyState[this.up]) { // move up
      this.currentSpeed += CONFIG.paddleAccel;
      this.y = Math.max(this.y - this.currentSpeed, this.width);
    }
    if (this.keyState[this.down]) {
      this.currentSpeed += CONFIG.paddleAccel; //  down
      this.y = Math.min(this.y + this.currentSpeed, this.boardHeight - this.height - this.width);
    }
    
    // paddle velocity reset, ie. remove accumulated acceleration
    if (this.keyState[this.up] == this.keyState[this.down]) {   // this line is XNOR, ie. reset accel when both/neither key is pressed
      this.currentSpeed = CONFIG.paddleVel;
    }

    // measure how far we've travelled between frames
    // positive for moving upwards, and negative for downwards
    // speedDelta is a float from +- [6.5, 18] 
    this.speedDelta = this.pastPos - this.y;
  }

  coordinates(x, y, width, height) { // used for mapping collisions with ball
    let leftX = x;
    let rightX = x + width;
    let topY = y;
    let bottomY = y + height;
    return [leftX, rightX, topY, bottomY];
  }
}
