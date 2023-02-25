# PixiJS — The HTML5 Creation Engine

> **Note**
> This is an alternative package to `pixi.js`, `@pixi/core`, etc that contains all of the PixiJS packages. This is much easier to consume since it contains all of the necessary packages, including optional packages in a single module.

![pixi.js logo](https://pixijs.download/pixijs-banner-no-version.png)

The aim of this project is to provide a fast lightweight 2D library that works
across all devices. The PixiJS renderer allows everyone to enjoy the power of
hardware acceleration without prior knowledge of WebGL. Also, it's fast. Really fast.

**We are now a part of the [Open Collective](https://opencollective.com/pixijs) and with your support you can help us make PixiJS even better. To make a donation, simply click the button below and we'll love you forever!**

<div align="center">
  <a href="https://opencollective.com/pixijs/donate" target="_blank">
    <img src="https://opencollective.com/pixijs/donate/button@2x.png?color=blue" width=250 />
  </a>
</div>

### Package Mappings

The names of packages have changed. These mappings are available as JSON from `pixijs/aliases`.

| Official Package | New Package |
|---|---|
| `pixi.js` | `pixijs/browser` or `pixijs` |
| `pixi.js-legacy` | `pixijs/browser/legacy` |
| `@pixi/accessibility` | `pixijs/accessibility` |
| `@pixi/app` | `pixijs/app` |
| `@pixi/assets` | `pixijs/assets` |
| `@pixi/basis` | `pixijs/basis` |
| `@pixi/canvas-display` | `pixijs/display/canvas` |
| `@pixi/canvas-extract` | `pixijs/extract/canvas` |
| `@pixi/canvas-graphics` | `pixijs/graphics/canvas` |
| `@pixi/canvas-mesh` | `pixijs/mesh/canvas` |
| `@pixi/canvas-particle-container` | `pixijs/particle-container/canvas` |
| `@pixi/canvas-prepare` | `pixijs/prepare/canvas` |
| `@pixi/canvas-renderer` | `pixijs/renderer/canvas` |
| `@pixi/canvas-sprite` | `pixijs/sprite/canvas` |
| `@pixi/canvas-sprite-tiling` | `pixijs/sprite-tiling/canvas` |
| `@pixi/canvas-text` | `pixijs/text/canvas` |
| `@pixi/compressed-textures` | `pixijs/compressed-textures` |
| `@pixi/constants` | `pixijs/constants` |
| `@pixi/core` | `pixijs/core` |
| `@pixi/display` | `pixijs/display` |
| `@pixi/events` | `pixijs/events` |
| `@pixi/extensions` | `pixijs/extensions` |
| `@pixi/extract` | `pixijs/extract` |
| `@pixi/filter-alpha` | `pixijs/filter/alpha` |
| `@pixi/filter-blur` | `pixijs/filter/blur` |
| `@pixi/filter-color-matrix` | `pixijs/filter/color-matrix` |
| `@pixi/filter-displacement` | `pixijs/filter/displacement` |
| `@pixi/filter-fxaa` | `pixijs/filter/fxaa` |
| `@pixi/filter-noise` | `pixijs/filter/noise` |
| `@pixi/graphics` | `pixijs/graphics` |
| `@pixi/graphics-extras` | `pixijs/graphics/extras` |
| `@pixi/math` | `pixijs/math` |
| `@pixi/math-extras` | `pixijs/math/extras` |
| `@pixi/mesh` | `pixijs/mesh` |
| `@pixi/mesh-extras` | `pixijs/mesh/extras` |
| `@pixi/mixin-cache-as-bitmap` | `pixijs/display/cache-as-bitmap` |
| `@pixi/mixin-get-child-by-name` | `pixijs/display/get-child-by-name` |
| `@pixi/mixin-get-global-position` | `pixijs/display/get-global-position` |
| `@pixi/node` | `pixijs/node` |
| `@pixi/particle-container` | `pixijs/particle-container` |
| `@pixi/prepare` | `pixijs/prepare` |
| `@pixi/runner` | `pixijs/runner` |
| `@pixi/settings` | `pixijs/settings` |
| `@pixi/sprite` | `pixijs/sprite` |
| `@pixi/sprite-animated` | `pixijs/sprite-animated` |
| `@pixi/sprite-tiling` | `pixijs/sprite-tiling` |
| `@pixi/spritesheet` | `pixijs/spritesheet` |
| `@pixi/text` | `pixijs/text` |
| `@pixi/text-bitmap` | `pixijs/text-bitmap` |
| `@pixi/ticker` | `pixijs/ticker` |
| `@pixi/unsafe-eval` | `pixijs/unsafe-eval` |
| `@pixi/utils` | `pixijs/utils` |
| `@pixi/webworker` | `pixijs/webworker` |

### Supported

This package is only supported in tools that support the [`exports` field](https://nodejs.org/api/packages.html#subpath-exports) for subpath entry points. For example:

* Webpack 5+
* Parcel 2+
* Node.js 16+
* TypeScript 4.7+

If using TypeScript, make sure to use `compilerOptions.moduleResolution` to `nodenext` or `node16`.

### Install

```
npm install pixijs
```

```ts
import * as PIXI from 'pixijs'
```

### Basic Usage Example

```js
import { Application, Assets, Sprite } from 'pixijs';

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
const app = new Application();

// The application will create a canvas element for you that you
// can then insert into the DOM
document.body.appendChild(app.view);

// load the texture we need
const texture = await Assets.load('bunny.png');

// This creates a texture from a 'bunny.png' image
const bunny = new Sprite(texture);

// Setup the position of the bunny
bunny.x = app.renderer.width / 2;
bunny.y = app.renderer.height / 2;

// Rotate around the center
bunny.anchor.x = 0.5;
bunny.anchor.y = 0.5;

// Add the bunny to the scene we are building
app.stage.addChild(bunny);

// Listen for frame updates
app.ticker.add(() => {
    // each frame we spin the bunny around a bit
    bunny.rotation += 0.01;
});
```

### License

This content is released under the (http://opensource.org/licenses/MIT) MIT License.
