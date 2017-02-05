import {clickBind, addListeners} from '../system'

import './player.css'

export default class Player {

    constructor(node) {
        this.paused = true;
        this.playerNode = node;
        this.domComponents = {
            player: node.querySelector('video'),
            playPause: node.querySelector('.play_pause'),
            playback_viewed: node.querySelector('.playback .filled'),
            playback: node.querySelector('.playback-click_area'),
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

        clickBind(components.playPause, this.playPauseListener.bind(this));

        components.player.addEventListener('timeupdate', this.timeUpdateListener.bind(this));
        components.player.addEventListener('volumechange', this.volumeChangedListener.bind(this));

        addListeners(components.playback, ['mousemove', 'mouseenter', 'touchmove'], this.showAndUpdateTimeMark.bind(this));
        addListeners(components.playback, ['mouseleave', 'touchend'], this.hideTimeMark.bind(this));
        clickBind(components.playback, this.setupPlaybackTime.bind(this));
        [].forEach.call(components.volume_bars, (bar) => clickBind(bar, this.volumeBarListener.bind(this)));

        clickBind(components.fullscreen, this.openInFullScreen.bind(this))
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
    showAndUpdateTimeMark(event) {
        const pageX = event.pageX || event.changedTouches[0].pageX;
        const player = this.domComponents.player;
        this.domComponents.timeContainer.style.visibility = 'visible';

        const rect = this.domComponents.playback.getBoundingClientRect();
        const offsetLeft = pageX - rect.left;
        const playbackPerc = (offsetLeft) / rect.width * 100;

        this.domComponents.timeContainer.style.transform = `translateX(${offsetLeft}px)`;


        const secondsInPerc = 100 / player.duration;
        const time = playbackPerc / secondsInPerc;
        if (playbackPerc > 0 && playbackPerc <= 100) {
            this.domComponents.timeText.innerHTML = Player.formatTime(time);
        } else {
            this.hideTimeMark();
        }
    }

    hideTimeMark() {
        this.domComponents.timeContainer.style.visibility = 'hidden';
    }

    /**
     *
     * @param {number} time Time in seconds
     * @return {string} Formatted string in hours minutes seconds format
     */
    static formatTime(time) {
        time = +time.toFixed();

        let format = `${time % 60}s`;

        if (time >= 60) {
            format = `${(time / 60).toFixed()}m ${format}`;
        }
        if (time >= 3600) {
            format = `${(time / 3600).toFixed()}h ${format}`;
        }

        return format;
    }

    setupPlaybackTime(event) {
        const pageX = event.pageX || event.changedTouches[0].pageX;

        const player = this.domComponents.player;

        const {left, width} = this.domComponents.playback.getBoundingClientRect();
        const playbackInPercent = (pageX - left) / width * 100;
        const timeInOnePercent = 100 / player.duration;

        player.currentTime = playbackInPercent / timeInOnePercent;
    }

    volumeBarListener(evt) {
        const currentBar = evt.currentTarget;
        const volume = currentBar.getAttribute('data-level') / 100;
        this.setVolumeLevel(volume);
    }

    setVolumeLevel(volume, unmute) {
        if (unmute === void 0) {
            unmute = true;
        }
        const player = this.domComponents.player;
        player.volume = volume;
        if (player.muted && unmute) {
            player.muted = false;
        } else if (player.muted && !unmute) {
            volume = 0;
        }

        for (let i = 0; i < this.domComponents.volume_bars.length; i++) {
            const bar = this.domComponents.volume_bars[i]
            const barVolume = bar.getAttribute('data-level') / 100;
            if (barVolume <= volume) {
                bar.classList.add('filled');
            } else {
                bar.classList.remove('filled');
            }
        }
    }

    volumeChangedListener() {
        const player = this.domComponents.player;

        this.setVolumeLevel(player.volume, false);
    }

    openInFullScreen() {
        const fullScreenFunctions = [
            'requestFullscreen', 'mozRequestFullScreen', 'webkitRequestFullscreen', 'msRequestFullscreen'
        ];

        const player = this.domComponents.player;
        for (let i = 0; i < fullScreenFunctions.length; i++) {
            const fnc = fullScreenFunctions[i];
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
