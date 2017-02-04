import './player.css'

export default class Player {

    constructor(node) {
        this.paused = false;
        this.playerNode = node;
        this.domComponents = {
            player: node.querySelector('video'),
            playPause: node.querySelector('.play_pause'),
        };

        this.linkEvents();
    }

    linkEvents() {
        this.domComponents.playPause.addEventListener('click', this.playPauseListener.bind(this));
    }

    playPauseListener() {
        if (this.paused) {
            this.play();
        } else {
            this.pause();
        }
    }

    play() {
        this.paused = false;

        this.domComponents.playPause.classList.add('played');
        this.domComponents.playPause.classList.remove('paused');

        this.domComponents.player.play();
    }

    pause() {
        this.paused = true;

        this.domComponents.playPause.classList.add('paused');
        this.domComponents.playPause.classList.remove('played');

        this.domComponents.player.pause();
    }
}
