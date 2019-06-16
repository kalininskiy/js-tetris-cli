import Config from './src/config';
import Game from './src/game';
import Matrix from './src/matrix';
import Controller from './src/controller';
import readline from 'readline';
import ansiRenderer from './renderer/ansi/ansi-terminal'

/**
 * Entry point
 *
 * @returns {Promise<boolean>}
 */
module.exports = async () => {

    const renderer = new ansiRenderer();
    renderer.clearScreen();

    renderer.cursorPosition(1, 1);
    renderer.out('Pure JS (ES6+) Tetris (ascii/ansi cli version) by Ivan "VDM" Kalininskiy, (c) 2019', 'yellow', 'bgBlack', 'bold');

    const config = new Config();
    const matrix = new Matrix(config.matrix);
    const game = new Game(config, matrix);
    const controller = new Controller(game, renderer, config);

    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);

    process.stdin.on('keypress', (str, key) => {
        if (key.ctrl && key.name === 'c') {
            process.exit();
        }

        controller.handleKeyboard(key);
    });

    return true;
};
