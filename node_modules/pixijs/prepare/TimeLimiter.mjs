class TimeLimiter {
  constructor(maxMilliseconds) {
    this.maxMilliseconds = maxMilliseconds;
    this.frameStart = 0;
  }
  beginFrame() {
    this.frameStart = Date.now();
  }
  allowedToUpload() {
    return Date.now() - this.frameStart < this.maxMilliseconds;
  }
}

export { TimeLimiter };
//# sourceMappingURL=TimeLimiter.mjs.map
