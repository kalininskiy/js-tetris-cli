/**
 * AnsiRenderer - ascii/ansi terminal renderer,
 * using VT-100/ANSI control escape sequences for terminal cursor hopping and colors
 * http://ascii-table.com/ansi-escape-sequences-vt-100.php
 *
 * @class AnsiRenderer
 */
class AnsiRenderer {
    constructor() {
        this.escapeSequence = '\u001b[';

        this.ansiModifiers = {
            reset: [0, 0],
            bold: [1, 22],
            dim: [2, 22],
            underline: [4, 24],
            italic: [3, 23],
            inverse: [7, 27],
        };

        this.ansiColorCodes = {
            black: [30, 39],
            red: [31, 39],
            green: [32, 39],
            yellow: [33, 39],
            blue: [34, 39],
            magenta: [35, 39],
            cyan: [36, 39],
            white: [37, 39],
            gray: [90, 39],

            bgBlack: [40, 49],
            bgRed: [41, 49],
            bgGreen: [42, 49],
            bgYellow: [43, 49],
            bgBlue: [44, 49],
            bgMagenta: [45, 49],
            bgCyan: [46, 49],
            bgWhite: [47, 49],
        };

        this.ansi = this._generateAnsiEscapeSequences(this.ansiColorCodes);
        this.modifiers = this._generateAnsiEscapeSequences(this.ansiModifiers);
    }

    _generateAnsiEscapeSequences(codes) {
        let result = [];
        for (let key in codes) {
            result[key] = {};
            result[key].start = this.escapeSequence + codes[key][0] + 'm';
            result[key].end = this.escapeSequence + codes[key][1] + 'm';
        }
        return result;
    }

    /**
     * Output to console ansi colored string
     *
     * @param string - output string
     * @param color - black, red, green, yellow, blue, magenta, cyan, white, gray
     * @param bgColor [bgBlack, bgRed, bgGreen, bgYellow, bgBlue, bgMagenta, bgCyan, bgWhite]
     * @param modifier [bold, dim, underline, italic, inverse]
     */
    out(string, color, bgColor, modifier) {
        let ansiString = this.ansi[color].start + string + this.ansi[color].end;
        if (bgColor) {
            ansiString = this.ansi[bgColor].start + ansiString + this.ansi[bgColor].end;
        }
        if (modifier) {
            ansiString = this.modifiers[modifier].start + ansiString + this.modifiers[modifier].end;
        }
        process.stdout.write(ansiString);
    }

    /**
     * Position the Cursor: \033[<L>;<C>H or \033[<L>;<C>f (puts the cursor at line L and column C)
     *
     * @param line
     * @param column
     */
    cursorPosition(line, column) {
        process.stdout.write(`${this.escapeSequence}${line};${column}H`);
    }

    /**
     * Move the cursor up N lines: \033[<N>A
     *
     * @param lines
     */
    cursorUp(lines) {
        process.stdout.write(`${this.escapeSequence}${lines}A`);
    }

    /**
     * Move the cursor down N lines: \033[<N>B
     *
     * @param lines
     */
    cursorDown(lines) {
        process.stdout.write(`${this.escapeSequence}${lines}B`);
    }

    /**
     * Move the cursor forward N columns: \033[<N>C
     *
     * @param columns
     */
    cursorForward(columns) {
        process.stdout.write(`${this.escapeSequence}${columns}C`);
    }

    /**
     * Move the cursor backward N columns: \033[<N>D
     *
     * @param columns
     */
    cursorBackward(columns) {
        process.stdout.write(`${this.escapeSequence}${columns}D`);
    }

    /**
     * Clear the screen, move to (0,0): \033[2J
     *
     */
    clearScreen() {
        process.stdout.write(`${this.escapeSequence}2J`);
    }

    /**
     * Erase to end of line: \033[K
     *
     */
    erase() {
        process.stdout.write(`${this.escapeSequence}K`);
    }

    /**
     * Save cursor position: \033[s
     *
     */
    saveCursor() {
        process.stdout.write(`${this.escapeSequence}s`);
    }

    /**
     * Restore cursor position: \033[u
     *
     */
    restoreCursor() {
        process.stdout.write(`${this.escapeSequence}u`);
    }
}

export default AnsiRenderer;
