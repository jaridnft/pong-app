export const SVG_NS = "http://www.w3.org/2000/svg";
export const KEYS = {
  upOne: 'w',        // player 1 up key
  downOne: 's',        // player 1 down key
  upTwo: 'ArrowUp',       // player 2 up key
  downTwo: 'ArrowDown',     // player 2 down key
  spaceBar: ' ', // pause 
  n: 'n', // new game
  N: 'N' // new game
}
export const CONFIG = {
    paddleWidth: 8,
		paddleHeight: 64,
    boardGap: 10,
    paddleVel: 6,
    paddleAccel: 0.5,
    maxScore: 10,
    ballRadius: 8,
    spinConst: 0.0035, // for best results keep between (0.002, 0.045)
    spinDecay: 0.965 // must be between (0, 1)
}