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
            if (block && block.x > -1 && block.x < this.columns && block.y > -1 && block.y < this.rows) {

                this[block.y][block.x] = block;
            }
        }
    }

    hasCollision(blocks) {
        for (let y = 0; y < blocks.blockConfig.length; y++) {
            for (let x = 0; x < blocks.blockConfig[0].length; x++) {
                const isAnyCollision = blocks.blockConfig[y][x] === 1 && (this.isOutOfBounds(blocks.x + x, blocks.y + y) || this.isOccupied(blocks.x + x, blocks.y + y));
                if (isAnyCollision) {
                    return true;
                }
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
            this.splice(index);
            this.unshift(new Array(this.columns).fill(0));
        }
        return lines.length;
    }

    splice(index) {
        let tempArray = [];

        for (let i = 0; i < this.rows; i++) {
            tempArray.push(this[i]);
        }

        for (let i = 0; i < index; i++) {
            this[i] = tempArray[i];
        }

        for (let i = index + 1; i < this.rows; i++) {
            this[i - 1] = tempArray[i];
        }

        this[this.rows] = new Array(this.columns).fill(1);
    }

    unshift(row) {
        let tempArray = [];

        for (let i = 0; i < this.rows; i++) {
            tempArray.push(this[i]);
        }

        this[0] = row;

        for (let i = 0; i < this.rows - 1; i++) {
            this[i + 1] = tempArray[i];
        }
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