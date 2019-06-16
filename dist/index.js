'use strict';

var _config = require('./src/config');

var _config2 = _interopRequireDefault(_config);

var _game = require('./src/game');

var _game2 = _interopRequireDefault(_game);

var _matrix = require('./src/matrix');

var _matrix2 = _interopRequireDefault(_matrix);

var _controller = require('./src/controller');

var _controller2 = _interopRequireDefault(_controller);

var _readline = require('readline');

var _readline2 = _interopRequireDefault(_readline);

var _ansiTerminal = require('./renderer/ansi/ansi-terminal');

var _ansiTerminal2 = _interopRequireDefault(_ansiTerminal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Entry point
 *
 * @returns {Promise<boolean>}
 */
module.exports = async () => {

    const renderer = new _ansiTerminal2.default();
    renderer.clearScreen();

    renderer.cursorPosition(1, 1);
    renderer.out('Pure JS (ES6+) Tetris (ascii/ansi cli version) by Ivan "VDM" Kalininskiy, (c) 2019', 'yellow', 'bgBlack', 'bold');

    const config = new _config2.default();
    const matrix = new _matrix2.default(config.matrix);
    const game = new _game2.default(config, matrix);
    const controller = new _controller2.default(game, renderer, config);

    _readline2.default.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);

    process.stdin.on('keypress', (str, key) => {
        if (key.ctrl && key.name === 'c') {
            process.exit();
        }

        controller.handleKeyboard(key);
    });

    return true;
};
//# sourceMappingURL=index.js.map