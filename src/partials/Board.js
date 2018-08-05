import { SVG_NS } from '../settings';

export default class Board {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  render(svg) { 
    // draw board
    let rect = document.createElementNS( SVG_NS, 'rect');
    rect.setAttributeNS(null, 'width', this.width);
    rect.setAttributeNS(null, 'height', this.height);
    rect.setAttributeNS(null, 'stroke', '#353535');
    
    // draw middle line
    let line = document.createElementNS( SVG_NS, 'line');
    line.setAttributeNS(null, 'x1', this.width / 2);
    line.setAttributeNS(null, 'y1', 0);
    line.setAttributeNS(null, 'x2', this.width / 2);
    line.setAttributeNS(null, 'y2', this.height);
    line.setAttributeNS(null, 'stroke', 'white');
    line.setAttributeNS(null, 'stroke-dasharray', '10, 7');
    line.setAttributeNS(null, 'stroke-width', '2');

    let playerOneText = document.createElementNS( SVG_NS, 'text');
    playerOneText.setAttributeNS(null, 'font-family', 'Silkscreen Web');
    playerOneText.setAttributeNS(null, 'font-size', 15);
    playerOneText.setAttributeNS(null, 'fill', 'white');
    playerOneText.setAttributeNS(null, 'x', this.width / 2 - 110);
    playerOneText.setAttributeNS(null, 'y', this.height - 5);
    playerOneText.textContent = 'player 1';

    let playerTwoText = document.createElementNS( SVG_NS, 'text');
    playerTwoText.setAttributeNS(null, 'font-family', 'Silkscreen Web');
    playerTwoText.setAttributeNS(null, 'font-size', 15);
    playerTwoText.setAttributeNS(null, 'fill', 'white');
    playerTwoText.setAttributeNS(null, 'x', this.width / 2 + 35);
    playerTwoText.setAttributeNS(null, 'y', this.height - 5);
    playerTwoText.textContent = 'player 2';
    
    // add shapes to game
    svg.appendChild(rect);
    svg.appendChild(line);
    svg.appendChild(playerOneText);
    svg.appendChild(playerTwoText);
  }
}