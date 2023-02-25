class AbstractMaskSystem {
  constructor(renderer) {
    this.renderer = renderer;
    this.maskStack = [];
    this.glConst = 0;
  }
  getStackLength() {
    return this.maskStack.length;
  }
  setMaskStack(maskStack) {
    const { gl } = this.renderer;
    const curStackLen = this.getStackLength();
    this.maskStack = maskStack;
    const newStackLen = this.getStackLength();
    if (newStackLen !== curStackLen) {
      if (newStackLen === 0) {
        gl.disable(this.glConst);
      } else {
        gl.enable(this.glConst);
        this._useCurrent();
      }
    }
  }
  _useCurrent() {
  }
  destroy() {
    this.renderer = null;
    this.maskStack = null;
  }
}

export { AbstractMaskSystem };
//# sourceMappingURL=AbstractMaskSystem.mjs.map
