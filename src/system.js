/**
 *
 * @param {HTMLElement} element
 * @param {Function} cb
 */
export function clickBind(element, cb) {
    if (!is_touch_device()) {
        element.addEventListener('click', cb);
        return;
    }

    let currentTarget = null;
    element.addEventListener('touchstart', function (evt) {
        currentTarget = evt.currentTarget;
    });

    element.addEventListener('touchend', function (evt) {
        if (currentTarget && evt.currentTarget === currentTarget) {
            cb.apply(null, arguments);
        }
    });

}

/**
 *
 * @param {HTMLElement} element
 * @param {string[]} events
 * @param {Function} cb callback
 */
export function addListeners(element, events, cb) {
    events.forEach((eventName) => element.addEventListener(eventName, cb))
}

function is_touch_device() {
    try {
        document.createEvent("TouchEvent");
        return true;
    } catch (e) {
        return false;
    }
}