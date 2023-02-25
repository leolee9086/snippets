'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function compileShader(gl, type, src) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  return shader;
}

exports.compileShader = compileShader;
//# sourceMappingURL=compileShader.js.map
