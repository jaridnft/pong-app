import { SVG_NS, KEYS, CONFIG } from '../settings';
import Board from './Board'; // to instantiate classes
import Paddle from './Paddle'; 
import Ball from './Ball';
import Score from './Score';

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
			KEYS.upOne,
			KEYS.downOne,
			'player1'
		);

		// instantiate player2
		this.player2 = new Paddle(
			this.height,
			this.paddleWidth,
			this.paddleHeight,
			(this.width - this.boardGap - this.paddleWidth),
			((this.height - this.paddleHeight) / 2),
			KEYS.upTwo,
			KEYS.downTwo,
			'player2'
		);

		// instantiate ball
		this.ball = new Ball(
			CONFIG.ballRadius,
			this.width,
			this.height
		);

		// instantiate score1
		this.score1 = new Score(this.width / 2 - 50, 30, 30);
		this.score2 = new Score(this.width / 2 + 25, 30, 30);

		document.addEventListener("keydown", event => {
      if (event.key === KEYS.spaceBar) {
				this.pause = !this.pause;
			} else if ((event.key === KEYS.n) || (event.key === KEYS.N)) {
				this.newGame = true;
			}
		});

		this.gameElement.insertAdjacentElement('beforebegin', document.createElement('h2'));

	} // end of constructor
	
	render() {
		if (this.pause) {
			return;
		}
		
		if ((this.player1.score === CONFIG.maxScore) || (this.player2.score === CONFIG.maxScore)) {
			this.gameEnd();
			return; 
		}

		// removes a bug that would start a new game immediately upon hitting maxScore
		// this has to be outside gameEnd() as the event listener is omnipresent
		this.newGame = false;
		
		// clear out existing elements
		this.gameElement.innerHTML = '';
		
		// repaint heading after game-over changes it
		this.h1 = document.querySelector('h1');
		this.h1.innerHTML = `BACKSPIN PONG`;
		this.h2 = document.querySelector('h2');
		this.h2.innerHTML = `Press 'space' to pause the game.`;
		
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
		this.ball.render(svg, this.player1, this.player2);
		
		// render the score
		this.score1.render(svg, this.player1.score);
		this.score2.render(svg, this.player2.score);	
		
	}

// game end DOM change
	gameEnd() {
		if (this.newGame) {
			this.player1.score = 0;
			this.player2.score = 0;
		}
		this.h1.innerHTML = `GAME OVER`;
		this.h2.innerHTML = ``;
		if (this.player1.score > this.player2.score) {
			this.gameElement.innerHTML = `<p>Player 1 wins! <br /> Press 'n' to begin a new game.</p>`;
		} else {
			this.gameElement.innerHTML = `<p>Player 2 wins! <br /> Press 'n' to begin a new game.</p>`;
		}
	}
	
}