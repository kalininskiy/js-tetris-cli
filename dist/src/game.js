'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _blocks = require('./blocks');

var _blocks2 = _interopRequireDefault(_blocks);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
        this.moveBlocksDown();
    }

    updateBlocks() {
        this.activeBlocks = this.nextBlocks ? this.nextBlocks : _blocks2.default.getRandom(this.config, 0, 0);
        this.nextBlocks = _blocks2.default.getRandom(this.config, 0, 0);
        this.activeBlocks.x = Math.floor((this._matrix.columns - this.activeBlocks.width) / 2);
        // this.activeBlocks.y = -1;

        if (this._matrix.hasCollision(this.activeBlocks)) {
            this.topOut = true;
        }
    }

    updateMatrix() {
        this._matrix.placeBlocks(this.activeBlocks);
    }

    updateScore() {
        const clearedLines = this._matrix.clearLines();
        if (clearedLines > 0) {
            this.score += this.points[clearedLines] * (this.level + 1);
            this.lines += clearedLines;
        }
    }

    get level() {
        return Math.floor(this.lines * 0.1);
    }

    get matrix() {
        const matrix = [];

        for (let y = 0; y < this._matrix.rows; y++) {
            matrix[y] = [];
            for (let x = 0; x < this._matrix.columns; x++) {
                matrix[y][x] = this._matrix[y][x];
            }
        }

        for (let block of this.activeBlocks) {
            if (block && block.x > -1 && block.x < this._matrix.columns && block.y > -1 && block.y < this._matrix.rows) {

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
        if (this.topOut) return;

        this.activeBlocks.moveDown();

        if (this._matrix.hasCollision(this.activeBlocks)) {
            this.activeBlocks.moveUp();
            this.updateMatrix();
            this.updateScore();
            this.updateBlocks();
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

exports.default = Game;
//# sourceMappingURL=game.js.map