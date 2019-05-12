/**
 * Blocks - universal tetris tetrominoes (tetriminoes, piece) class
 * https://tetris.fandom.com/wiki/Piece
 *
 * @class Blocks
 */
class Blocks {
    constructor(config, x , y) {
        this.type = config.type;
        this.symbols = config.symbols;
        this.frontColor = config.frontColor;
        this.backgroundColor = config.backgroundColor;
        this.blockConfig = config.blockConfig;
        this.x = x;
        this.y = y;
    }

    *[Symbol.iterator]() {
        for (let y = 0; y < this.blockConfig.length; y++) {
            for (let x = 0; x < this.blockConfig[y].length; x++) {
                yield this.blockConfig[y][x] ? {
                    y: this.y + y,
                    x: this.x + x,
                    symbols: this.symbols,
                    frontColor: this.frontColor,
                    backgroundColor: this.backgroundColor
                } : null;
            }
        }
    }

    static getRandom(config, x ,y) {
        const types = config.classicTypes;;
        const index = Math.floor(Math.random() * types.length);
        const type = types[index];
        return new Blocks(config.pieceTypes[type], x, y);
    }

    moveLeft() {
        this.x +=1;
    }

    moveRight() {
        this.x -=1;
    }

    moveUp() {
        this.y -=1;
    }

    moveDown() {
        this.y +=1;
    }

    get width() {
        return this.blockConfig[0].length;
    }

    get height() {
        return this.blockConfig.length;
    }

    rotateBlockConfig() {
        const matrix = this.blockConfig;
        const matrixSize = matrix.length;
        const x = Math.floor(matrixSize / 2);
        const y = matrixSize - 1;

        for (let layer = 0; layer < x; ++layer) {
            let first = layer;
            let last = y - layer;
            for(let i = first; i < last; ++i) {
                let offset = i - first;
                 // save top
                let top = matrix[first][i];
                // left -> top
                matrix[first][i] = matrix[last-offset][first];
                // bottom -> left
                matrix[last-offset][first] = matrix[last][last - offset];
                // right -> bottom
                matrix[last][last - offset] = matrix[i][last];
                // top -> right
                matrix[i][last] = top; // right <- saved top
            }
        }
    }
}

export default Blocks;
