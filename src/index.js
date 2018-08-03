import './styles/game.css';
import Game from './partials/Game'

// create a game instance
const game = new Game('game', 768, 384);

(function gameLoop() {
    game.render();
    requestAnimationFrame(gameLoop);
})();
