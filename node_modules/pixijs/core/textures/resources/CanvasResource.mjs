import { BaseImageResource } from './BaseImageResource.mjs';

class CanvasResource extends BaseImageResource {
  constructor(source) {
    super(source);
  }
  static test(source) {
    const { OffscreenCanvas } = globalThis;
    if (OffscreenCanvas && source instanceof OffscreenCanvas) {
      return true;
    }
    return globalThis.HTMLCanvasElement && source instanceof HTMLCanvasElement;
  }
}

export { CanvasResource };
//# sourceMappingURL=CanvasResource.mjs.map
