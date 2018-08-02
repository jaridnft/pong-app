import { SVG_NS, CONFIG } from '../settings';

export default class Ball {
  constructor(radius, boardWidth, boardHeight) {
    this.radius = radius;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.direction = CONFIG.direction;
  }

  reset() {
    this.x = this.boardWidth / 2;
    this.y = this.boardHeight / 2;
  }

  render(svg) { 
    // draw ball
    let ball = document.createElementNS( SVG_NS, 'circle');
    ball.setAttributeNS(null, 'r', this.radius);
    ball.setAttributeNS(null, 'cx', this.boardWidth / 2);
    ball.setAttributeNS(null, 'cy', this.boardHeight / 2);
    ball.setAttributeNS(null, 'stroke', 'white');
    ball.setAttributeNS(null, 'fill', 'white');
    ball.setAttributeNS(null, 'id', 'ball');

    // add ball to game
    svg.appendChild(ball);
  }
}
