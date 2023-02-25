class IGLUniformData {
}
class GLProgram {
  constructor(program, uniformData) {
    this.program = program;
    this.uniformData = uniformData;
    this.uniformGroups = {};
    this.uniformDirtyGroups = {};
    this.uniformBufferBindings = {};
  }
  destroy() {
    this.uniformData = null;
    this.uniformGroups = null;
    this.uniformDirtyGroups = null;
    this.uniformBufferBindings = null;
    this.program = null;
  }
}

export { GLProgram, IGLUniformData };
//# sourceMappingURL=GLProgram.mjs.map
