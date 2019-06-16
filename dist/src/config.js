'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _default = require('../../config/themes/default.json');

var _default2 = _interopRequireDefault(_default);

var _default3 = require('../../config/default.json');

var _default4 = _interopRequireDefault(_default3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Config - game universal configuration class
 *
 * @class Config
 */
class Config {
    constructor() {
        // Import game initial parameters
        this.score = _default4.default.score;
        this.points = _default4.default.points;
        this.level = _default4.default.level;
        this.lines = _default4.default.lines;
        this.matrixRows = _default4.default.matrixRows;
        this.matrixColumns = _default4.default.matrixColumns;

        // Import theme parameters
        this.theme = _default2.default;

        // Import matrix parameters
        this.matrix = {
            rows: this.matrixRows,
            columns: this.matrixColumns,
            backgroundSymbols: this.theme.matrix.backgroundSymbols,
            frontColor: this.theme.matrix.frontColor,
            backgroundColor: this.theme.matrix.backgroundColor
        };

        // Classic seven "I,J,L,O,S,T,Z" tetrominoes with classic color scheme
        // https://en.wikipedia.org/wiki/File:Tetrominoes_IJLO_STZ_Worlds.svg

        this.classicTypes = 'IJLOSTZ';
        this.pieceTypes = [];

        this.pieceTypes['I'] = {
            type: 'I',
            symbols: this.theme.piece.I.symbols,
            frontColor: this.theme.piece.I.frontColor,
            backgroundColor: this.theme.piece.I.backgroundColor,
            blockConfig: [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]] };

        this.pieceTypes['J'] = {
            type: 'J',
            symbols: this.theme.piece.J.symbols,
            frontColor: this.theme.piece.J.frontColor,
            backgroundColor: this.theme.piece.J.backgroundColor,
            blockConfig: [[0, 1, 0], [0, 1, 0], [1, 1, 0]] };

        this.pieceTypes['L'] = {
            type: 'L',
            symbols: this.theme.piece.L.symbols,
            frontColor: this.theme.piece.L.frontColor,
            backgroundColor: this.theme.piece.L.backgroundColor,
            blockConfig: [[0, 1, 0], [0, 1, 0], [0, 1, 1]] };

        this.pieceTypes['O'] = {
            type: 'O',
            symbols: this.theme.piece.O.symbols,
            frontColor: this.theme.piece.O.frontColor,
            backgroundColor: this.theme.piece.O.backgroundColor,
            blockConfig: [[1, 1], [1, 1]] };

        this.pieceTypes['S'] = {
            type: 'S',
            symbols: this.theme.piece.S.symbols,
            frontColor: this.theme.piece.S.frontColor,
            backgroundColor: this.theme.piece.S.backgroundColor,
            blockConfig: [[0, 0, 0], [0, 1, 1], [1, 1, 0]] };

        this.pieceTypes['T'] = {
            type: 'T',
            symbols: this.theme.piece.T.symbols,
            frontColor: this.theme.piece.T.frontColor,
            backgroundColor: this.theme.piece.T.backgroundColor,
            blockConfig: [[0, 0, 0], [1, 1, 1], [0, 1, 0]] };

        this.pieceTypes['Z'] = {
            type: 'Z',
            symbols: this.theme.piece.Z.symbols,
            frontColor: this.theme.piece.Z.frontColor,
            backgroundColor: this.theme.piece.Z.backgroundColor,
            blockConfig: [[0, 0, 0], [1, 1, 0], [0, 1, 1]] };
    }
}

exports.default = Config;
//# sourceMappingURL=config.js.map