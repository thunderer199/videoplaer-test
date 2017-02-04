import './player.css'

export default class Player {

    constructor(node) {
        this.paused = false;
        this.playerNode = node;
        this.domComponents = {
            player: node.querySelector('video'),
            playPause: node.querySelector('.play_pause'),
            playback_viewed: node.querySelector('.playback .filled'),
            playback: node.querySelector('.playback'),
            timeContainer: node.querySelector('.time-block'),
            timeText: node.querySelector('.time'),
            volume_container: node.querySelector('.volume'),
            volume_bars: node.querySelectorAll('.volume_bar'),
            fullscreen: node.querySelector('.fullscreen'),
        };

        this.linkEvents();
    }

    linkEvents() {
        const components = this.domComponents;

        components.playPause.addEventListener('click', this.playPauseListener.bind(this));

        components.player.addEventListener('timeupdate', this.timeUpdateListener.bind(this));

        components.playback.addEventListener('mousemove', this.showAndUpdateTimeMark.bind(this));
        components.playback.addEventListener('mouseenter', this.showAndUpdateTimeMark.bind(this));
        components.playback.addEventListener('mouseleave', () => components.timeContainer.style.visibility = 'hidden');
        components.playback.addEventListener('click', this.setupPlaybackTime.bind(this));
        components.volume_bars.forEach((bar) => bar.addEventListener('click', this.volumeBarListener.bind(this)));

        components.fullscreen.addEventListener('click', this.openInFullScreen.bind(this))
    }

    playPauseListener() {
        if (this.paused) {
            this.play();
        } else {
            this.pause();
        }
    }

    timeUpdateListener() {
        const player = this.domComponents.player;
        let viewedPercent = player.currentTime / player.duration * 100;
        this.domComponents.playback_viewed.style.width = `${viewedPercent}%`;

        if (player.ended) {
            this.pause();
        }
    }

    /**
     *
     * @param {Event} event with coordinates
     */
    showAndUpdateTimeMark({pageX}) {
        const player = this.domComponents.player;
        this.domComponents.timeContainer.style.visibility = 'visible';

        const rect = this.domComponents.playback.getBoundingClientRect();
        const offsetLeft = pageX - rect.left;
        const playbackPerc = (offsetLeft) / rect.width * 100;

        this.domComponents.timeContainer.style.transform = `translateX(${offsetLeft}px)`;


        const secondsInPerc = 100 / player.duration;
        const time = playbackPerc / secondsInPerc;
        this.domComponents.timeText.innerHTML = Player.formatTime(time);
    }


    /**
     *
     * @param {number} time Time in seconds
     * @return {string} Formatted string in hours minutes seconds format
     */
    static formatTime(time) {
        let format = (time % 60).toFixed() + 's';

        if (time < 60 && time > 60) {
            format = (time / 60).toFixed() + 'm ' + format;
        }
        if (time < 3600 && time > 3600) {
            format = (time / 3600).toFixed() + 'h ' + format;
        }

        return format;
    }

    setupPlaybackTime({pageX}) {
        const player = this.domComponents.player;

        const {left, width} = this.domComponents.playback.getBoundingClientRect();
        const playbackInPercent = (pageX - left) / width * 100;
        const timeInOnePercent = 100 / player.duration;

        player.currentTime = playbackInPercent / timeInOnePercent;
    }

    volumeBarListener(evt) {
        const currentBar = evt.currentTarget;
        this.domComponents.player.volume = currentBar.getAttribute('data-level') / 100;

        let filled = true;
        for (const bar of this.domComponents.volume_bars) {
            if (filled) {
                bar.classList.add('filled');
            } else {
                bar.classList.remove('filled');
            }

            filled = filled ^ (bar === currentBar); // current bar set filled to false state
        }
    }

    openInFullScreen() {
        const fullScreenFunctions = [
            'requestFullscreen', 'mozRequestFullScreen', 'webkitRequestFullscreen', 'msRequestFullscreen'
        ];

        const player = this.domComponents.player;
        for (const fnc of fullScreenFunctions) {
            if (fnc in player) {
                player[fnc].call(player);
            }
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
