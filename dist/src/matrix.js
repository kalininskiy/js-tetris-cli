"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Matrix - tetris game playfield [well, grid, frame & etc]
 * https://tetris.fandom.com/wiki/Playfield
 *
 * @class Matrix
 */
class Matrix {
    constructor(config) {
        this.rows = config.rows;
        this.columns = config.columns;
        this.backgroundSymbols = config.backgroundSymbols;
        this.frontColor = config.frontColor;
        this.backgroundColor = config.backgroundColor;

        // Create & fill zero-matrix (rows * columns) size
        for (let i = 0; i < config.rows; i++) {
            this[i] = new Array(config.columns).fill(0);
        }
    }

    placeBlocks(blocks) {
        for (const block of blocks) {
            if (block) {
                this[block.y][block.x] = block;
            }
        }
    }

    hasCollision(blocks) {
        for (const block of blocks) {
            if (block && (this.isOutOfBounds(block.x, block.y) || this.isOccupied(block.x, block.y))) {
                return true;
            }
        }
        return false;
    }

    clearLines() {
        const lines = this.getLinesToRemove();
        return this.removeLines(lines);
    }

    getLinesToRemove() {
        let lines = [];

        for (let y = this.rows - 1; y >= 0; y--) {
            let numberOfBlocks = 0;

            for (let x = 0; x < this.columns; x++) {
                if (this[y][x]) {
                    numberOfBlocks += 1;
                }
            }

            if (numberOfBlocks === 0) {
                break;
            } else if (numberOfBlocks < this.columns) {
                continue;
            } else if (numberOfBlocks === this.columns) {
                lines.unshift(y);
            }
        }

        return lines;
    }

    removeLines(lines) {
        for (let index of lines) {
            this.splice(index, 1);
            this.unshift(new Array(this.columns).fill(0));
        }

        return lines.length;
    }

    isOutOfBounds(x, y) {
        return this[y] === undefined || this[y][x] === undefined;
    }

    isOccupied(x, y) {
        return this[y][x];
    }

    *[Symbol.iterator]() {
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.columns; x++) {
                yield this[y][x];
            }
        }
    }
}

exports.default = Matrix;
//# sourceMappingURL=matrix.js.map