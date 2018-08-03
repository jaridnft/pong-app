import { SVG_NS, CONFIG } from '../settings';

export default class Paddle {
  constructor(boardHeight, width, height, x, y, up, down) {
    this.boardHeight = boardHeight;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speed = CONFIG.speed;
    this.score = CONFIG.score;
   
    document.addEventListener("keydown", event => {
      switch (event.key) {
        case up:
          this.moveUp();
          break;
        case down:
          this.moveDown();
          break;
      }
    });
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

    // add paddle to game
    svg.appendChild(paddle);
  }

  moveUp() {
    this.y = Math.max(this.y - this.speed, this.width);
  }

  moveDown() {
    this.y = Math.min(this.y + this.speed, this.boardHeight - this.height - this.width);
  }

  coordinates(x, y, width, height) {
    let leftX = x;
    let rightX = x + width;
    let topY = y;
    let bottomY = y + height;
    return [leftX, rightX, topY, bottomY];
  }
}
