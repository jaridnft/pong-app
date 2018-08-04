import { SVG_NS } from '../settings'

export default class Score {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
  }
  
  render(svg, score){
    let scoreText = document.createElementNS( SVG_NS, 'text');
    scoreText.setAttributeNS(null, 'font-family', 'Silkscreen Web');
    scoreText.setAttributeNS(null, 'font-size', this.size);
    scoreText.setAttributeNS(null, 'fill', 'white');
    scoreText.setAttributeNS(null, 'x', this.x);
    scoreText.setAttributeNS(null, 'y', this.y);

    svg.appendChild(scoreText);
    scoreText.textContent = score;
  }
}