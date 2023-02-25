let UUID = 0;
let MAX_WORKERS;
const WHITE_PNG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=";
const checkImageBitmapCode = {
  id: "checkImageBitmap",
  code: `
    async function checkImageBitmap()
    {
        try
        {
            if (typeof createImageBitmap !== 'function') return false;

            const response = await fetch('${WHITE_PNG}');
            const imageBlob =  await response.blob();
            const imageBitmap = await createImageBitmap(imageBlob);

            return imageBitmap.width === 1 && imageBitmap.height === 1;
        }
        catch (e)
        {
            return false;
        }
    }
    checkImageBitmap().then((result) => { self.postMessage(result); });
    `
};
const workerCode = {
  id: "loadImageBitmap",
  code: `
    async function loadImageBitmap(url)
    {
        const response = await fetch(url);

        if (!response.ok)
        {
            throw new Error(\`[WorkerManager.loadImageBitmap] Failed to fetch \${url}: \`
                + \`\${response.status} \${response.statusText}\`);
        }

        const imageBlob =  await response.blob();
        const imageBitmap = await createImageBitmap(imageBlob);

        return imageBitmap;
    }
    self.onmessage = async (event) =>
    {
        try
        {
            const imageBitmap = await loadImageBitmap(event.data.data[0]);

            self.postMessage({
                data: imageBitmap,
                uuid: event.data.uuid,
                id: event.data.id,
            }, [imageBitmap]);
        }
        catch(e)
        {
            self.postMessage({
                error: e,
                uuid: event.data.uuid,
                id: event.data.id,
            });
        }
    };`
};
let workerURL;
class WorkerManagerClass {
  constructor() {
    this._initialized = false;
    this._createdWorkers = 0;
    this.workerPool = [];
    this.queue = [];
    this.resolveHash = {};
  }
  isImageBitmapSupported() {
    if (this._isImageBitmapSupported !== void 0)
      return this._isImageBitmapSupported;
    this._isImageBitmapSupported = new Promise((resolve) => {
      const workerURL2 = URL.createObjectURL(new Blob([checkImageBitmapCode.code], { type: "application/javascript" }));
      const worker = new Worker(workerURL2);
      worker.addEventListener("message", (event) => {
        worker.terminate();
        URL.revokeObjectURL(workerURL2);
        resolve(event.data);
      });
    });
    return this._isImageBitmapSupported;
  }
  loadImageBitmap(src) {
    return this._run("loadImageBitmap", [src]);
  }
  async _initWorkers() {
    if (this._initialized)
      return;
    this._initialized = true;
  }
  getWorker() {
    if (MAX_WORKERS === void 0) {
      MAX_WORKERS = navigator.hardwareConcurrency || 4;
    }
    let worker = this.workerPool.pop();
    if (!worker && this._createdWorkers < MAX_WORKERS) {
      if (!workerURL) {
        workerURL = URL.createObjectURL(new Blob([workerCode.code], { type: "application/javascript" }));
      }
      this._createdWorkers++;
      worker = new Worker(workerURL);
      worker.addEventListener("message", (event) => {
        this.complete(event.data);
        this.returnWorker(event.target);
        this.next();
      });
    }
    return worker;
  }
  returnWorker(worker) {
    this.workerPool.push(worker);
  }
  complete(data) {
    if (data.error !== void 0) {
      this.resolveHash[data.uuid].reject(data.error);
    } else {
      this.resolveHash[data.uuid].resolve(data.data);
    }
    this.resolveHash[data.uuid] = null;
  }
  async _run(id, args) {
    await this._initWorkers();
    const promise = new Promise((resolve, reject) => {
      this.queue.push({ id, arguments: args, resolve, reject });
    });
    this.next();
    return promise;
  }
  next() {
    if (!this.queue.length)
      return;
    const worker = this.getWorker();
    if (!worker) {
      return;
    }
    const toDo = this.queue.pop();
    const id = toDo.id;
    this.resolveHash[UUID] = { resolve: toDo.resolve, reject: toDo.reject };
    worker.postMessage({
      data: toDo.arguments,
      uuid: UUID++,
      id
    });
  }
}
const WorkerManager = new WorkerManagerClass();

export { WorkerManager };
//# sourceMappingURL=WorkerManager.mjs.map
