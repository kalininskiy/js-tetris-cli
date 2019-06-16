/**
 * Controller - handle keyboard pressing and control main game loop
 *
 * @class Controller
 */
class Controller {
    constructor(game, renderer, config) {
        this.game = game;
        this.renderer = renderer;
        this.config = config;
        this.isPlaying = false;
        this.interval = null;

        this.update = this.update.bind(this);
        this.startTimer();
        // this.renderer.renderStartScreen();
    }

    handleKeyboard(key) {
        switch(key.name) {
            case 'return':
                if (this.isPlaying) {
                    this.pause();
                } else {
                    this.play();
                }
                break;
            case 'up':
                this.game.rotateBlocks();
                this.updateRender();
                break;
            case 'down':
                this.game.moveBlocksDown();
                this.updateRender();
                break;
            case 'left':
                this.game.moveBlocksLeft();
                this.updateRender();
                break;
            case 'right':
                this.game.moveBlocksRight();
                this.updateRender();
                break;
        }
    }

    get viewModel() {
        const game = this.game;

        return {
            matrix: game.matrix,
            nextBlocks: game.nextBlocks,
            isGameOver: game.topOut,
            score: game.score,
            level: game.level,
            lines: game.lines
        };
    }

    update() {
        this.game.moveBlocksDown();
        this.updateRender();
    }

    play() {
        this.isPlaying = true;
        this.startTimer();
        this.updateRender();
    }

    pause() {
        this.isPlaying = false;
        this.stopTimer();
        this.updateRender();
    }

    updateRender() {
        const viewModel = this.viewModel;
        this.renderer.renderMainScreen(viewModel, this.config);

        // if (viewModel.isGameOver) {
        //     this.renderer.renderEndScreen(viewModel);
        // } else if (!this._isPlaying) {
        //     this.renderer.renderPauseScreen(viewModel);
        // } else {
        //     this.renderer.renderMainScreen(viewModel);
        // }
    }

    startTimer() {
        const speed = 1000 - this.game.level * 100;

        if (!this.interval) {
            this.interval = setInterval(() => {
                this.update()
            }, speed > 0 ? speed : 100);
        }
    }

    stopTimer() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
}

export default Controller;
