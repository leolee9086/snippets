class CountLimiter {
  constructor(maxItemsPerFrame) {
    this.maxItemsPerFrame = maxItemsPerFrame;
    this.itemsLeft = 0;
  }
  beginFrame() {
    this.itemsLeft = this.maxItemsPerFrame;
  }
  allowedToUpload() {
    return this.itemsLeft-- > 0;
  }
}

export { CountLimiter };
//# sourceMappingURL=CountLimiter.mjs.map
