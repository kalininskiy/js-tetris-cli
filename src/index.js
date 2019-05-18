import Config from './src/config';
import Blocks from './src/blocks';
import Game from './src/game';
import Matrix from './src/matrix';
import Controller from './src/controller';
import readline from 'readline';

/**
 * Entry point
 *
 * @returns {Promise<boolean>}
 */
module.exports = async () => {

    const config = new Config();
    const matrix = new Matrix(config.matrix);
    const game = new Game(config, matrix);
    const controller = new Controller(game, undefined);

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