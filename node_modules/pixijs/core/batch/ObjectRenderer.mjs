class ObjectRenderer {
  constructor(renderer) {
    this.renderer = renderer;
  }
  flush() {
  }
  destroy() {
    this.renderer = null;
  }
  start() {
  }
  stop() {
    this.flush();
  }
  render(_object) {
  }
}

export { ObjectRenderer };
//# sourceMappingURL=ObjectRenderer.mjs.map
