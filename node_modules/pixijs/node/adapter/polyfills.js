'use strict';

globalThis.requestAnimationFrame = function requestAnimationFrame(fn) {
  return setTimeout(fn, 1e3 / 60);
};
globalThis.cancelAnimationFrame = function cancelAnimationFrame(fn) {
  return clearTimeout(fn);
};
//# sourceMappingURL=polyfills.js.map
