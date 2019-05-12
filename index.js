import Config from './src/config';
import Blocks from './src/blocks';
import Game from './src/game';
import Matrix from './src/matrix';

const config = new Config();
const matrix = new Matrix(config.matrix);
const game = new Game(config, matrix);

const activeBlocks = Blocks.getRandom(config, 3, 0);

game.setActiveBlocks(activeBlocks);

game.rotateBlocks();
game.rotateBlocks();
game.rotateBlocks();
game.moveBlocksDown();
game.moveBlocksDown();
game.placeActiveBlocks();

console.log(game);
