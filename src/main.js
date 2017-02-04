import Player from './player/player'

(function () {
    document.addEventListener('DOMContentLoaded', loaded);

    function loaded() {
        const playerNode = document.querySelector('.player');
        const p = new Player(playerNode);

        console.log(playerNode);
    }
})();