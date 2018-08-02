import { SVG_NS, KEYS, CONFIG } from '../settings';
import Board from './Board'; //added to instantiate board class
import Paddle from './Paddle';
import Ball from './Ball';

export default class Game {

	constructor(element, width, height) {
		this.element = element;
		this.width = width;
		this.height = height;
		this.gameElement = document.getElementById(this.element);
	
		// instantiate a new board when we construct a game
		this.board = new Board(this.width, this.height);
		
		// setting up player values
		this.paddleWidth = CONFIG.paddleWidth;
		this.paddleHeight = CONFIG.paddleHeight;
		this.boardGap = CONFIG.boardGap;

		// instantiate player1
		this.player1 = new Paddle(
			this.height,
			this.paddleWidth,
			this.paddleHeight,
			this.boardGap,
			((this.height - this.paddleHeight) / 2),
			KEYS.w,
			KEYS.s
		);

		// instantiate player2
		this.player2 = new Paddle(
			this.height,
			this.paddleWidth,
			this.paddleHeight,
			(this.width - this.boardGap - this.paddleWidth),
			((this.height - this.paddleHeight) / 2),
			KEYS.up,
			KEYS.down
		);

		// instantiate ball
		this.ball = new Ball(
			CONFIG.ballRadius,
			this.width,
			this.height
		);
	}

	render() {
		// clear out existing elements
		this.gameElement.innerHTML = '';
		// create new elements
		let svg = document.createElementNS(SVG_NS, 'svg');
		svg.setAttributeNS(null, 'width', this.width);
		svg.setAttributeNS(null, 'height', this.height);
		svg.setAttributeNS(null, 'viewBox', `0 0 ${this.width} ${this.height}`);
		this.gameElement.appendChild(svg);

		// render the board
		this.board.render(svg);

		// render the paddles
		this.player1.render(svg);
		this.player2.render(svg);

		// render the ball
		this.ball.render(svg);
	}

}