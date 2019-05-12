import importedTheme from './config/themes/default.json';
import importedConfig from './config/default.json';

/**
 * Config - game universal configuration class
 *
 * @class Config
 */
class Config {
    constructor() {
        // Import game initial parameters
        this.score = importedConfig.score;
        this.points = importedConfig.points;
        this.level = importedConfig.level;
        this.lines = importedConfig.lines;
        this.matrixRows = importedConfig.matrixRows;
        this.matrixColumns = importedConfig.matrixColumns;

        // Import theme parameters
        this.theme = importedTheme;

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
            blockConfig: [
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0]
            ]};

        this.pieceTypes['J'] = {
            type: 'J',
            symbols: this.theme.piece.J.symbols,
            frontColor: this.theme.piece.J.frontColor,
            backgroundColor: this.theme.piece.J.backgroundColor,
            blockConfig: [
                [0,1,0],
                [0,1,0],
                [1,1,0]
            ]};

        this.pieceTypes['L'] = {
            type: 'L',
            symbols: this.theme.piece.L.symbols,
            frontColor: this.theme.piece.L.frontColor,
            backgroundColor: this.theme.piece.L.backgroundColor,
            blockConfig: [
                [0,1,0],
                [0,1,0],
                [0,1,1]
            ]};

        this.pieceTypes['O'] = {
            type: 'O',
            symbols: this.theme.piece.O.symbols,
            frontColor: this.theme.piece.O.frontColor,
            backgroundColor: this.theme.piece.O.backgroundColor,
            blockConfig: [
                [1,1],
                [1,1]
            ]};

        this.pieceTypes['S'] = {
            type: 'S',
            symbols: this.theme.piece.S.symbols,
            frontColor: this.theme.piece.S.frontColor,
            backgroundColor: this.theme.piece.S.backgroundColor,
            blockConfig: [
                [1,0,0],
                [1,1,1],
                [0,0,1]
            ]};

        this.pieceTypes['T'] = {
            type: 'T',
            symbols: this.theme.piece.T.symbols,
            frontColor: this.theme.piece.T.frontColor,
            backgroundColor: this.theme.piece.T.backgroundColor,
            blockConfig: [
                [0,0,0],
                [1,1,1],
                [0,1,0]
            ]};

        this.pieceTypes['Z'] = {
            type: 'Z',
            symbols: this.theme.piece.Z.symbols,
            frontColor: this.theme.piece.Z.frontColor,
            backgroundColor: this.theme.piece.Z.backgroundColor,
            blockConfig: [
                [0,0,1],
                [1,1,1],
                [1,0,0]
            ]};
    }
}

export default Config;
