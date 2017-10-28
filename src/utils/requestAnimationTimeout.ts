export const requestAnimationTimeout = (fps, callback) => {
    setTimeout(() => {
        requestAnimationFrame(() => requestAnimationTimeout(fps, callback));
        callback();
    }, 1000 / fps);
};
