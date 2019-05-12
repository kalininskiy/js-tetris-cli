import Blocks from './blocks';

/**
 * Game - main game logic class
 *
 * @class Game
 */
class Game {
    constructor(config, matrix) {
        this.config = config;
        this.score = config.score;
        this.points = config.points;
        this.lines = config.lines;
        this._matrix = matrix;
        this.topOut = false;
        this.activeBlocks = null;
        this.nextBlocks = null;

        this.updateBlocks();
    }

    updateBlocks() {
        this.activeBlocks = this.nextBlocks ? this.nextBlocks : Blocks.getRandom(this.config, 0, 0);
        this.nextBlocks = Blocks.getRandom(this.config, 0, 0);
        this.activeBlocks.x = Math.floor((this._matrix.columns - this.activeBlocks.width) / 2);
        this.activeBlocks.y = -1;

        if (this._matrix.hasCollision(this.activeBlocks)) {
            this.topOut = true;
        }
    }

    updateMatrix() {
        this._matrix.placeBlocks(this.activeBlocks);
    }

    updateScore() {
        const clearedLines = this._grid.clearLines();

        if (clearedLines > 0) {
            this.score += Game.points[clearedLines] * (this.level + 1);
            this.lines += clearedLines;
        }
    }

    get level() {
        return Math.floor(this.lines * 0.1);
    }

    get matrix() {
        const matrix = this._matrix.map(row => [...row]);

        for (let block of this.activeBlocks) {
            if (block) {
                matrix[block.y][block.x] = block;
            }
        }

        return matrix;
    }

    setActiveBlocks(blocks) {
        this.activeBlocks = blocks;
    }

    placeActiveBlocks() {
        this._matrix.placeBlocks(this.activeBlocks);
    }

    moveBlocksLeft() {
        this.activeBlocks.moveLeft();

        if (this._matrix.hasCollision(this.activeBlocks)) {
            this.activeBlocks.moveRight();
        }
    }

    moveBlocksRight() {
        this.activeBlocks.moveRight();

        if (this._matrix.hasCollision(this.activeBlocks)) {
            this.activeBlocks.moveLeft();
        }
    }

    moveBlocksDown() {
        this.activeBlocks.moveDown();

        if (this._matrix.hasCollision(this.activeBlocks)) {
            this.activeBlocks.moveUp();
            this._matrix.placeBlocks(this.activeBlocks);
        }
    }

    rotateBlocks() {
        const tempBlockConfig = this.activeBlocks.blockConfig.map(row => [...row]);
        this.activeBlocks.rotateBlockConfig();

        if (this._matrix.hasCollision(this.activeBlocks)) {
            this.activeBlocks.blockConfig = tempBlockConfig;
        }
    }
}

export default Game;
