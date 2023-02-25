class MeshBatchUvs {
  constructor(uvBuffer, uvMatrix) {
    this.uvBuffer = uvBuffer;
    this.uvMatrix = uvMatrix;
    this.data = null;
    this._bufferUpdateId = -1;
    this._textureUpdateId = -1;
    this._updateID = 0;
  }
  update(forceUpdate) {
    if (!forceUpdate && this._bufferUpdateId === this.uvBuffer._updateID && this._textureUpdateId === this.uvMatrix._updateID) {
      return;
    }
    this._bufferUpdateId = this.uvBuffer._updateID;
    this._textureUpdateId = this.uvMatrix._updateID;
    const data = this.uvBuffer.data;
    if (!this.data || this.data.length !== data.length) {
      this.data = new Float32Array(data.length);
    }
    this.uvMatrix.multiplyUvs(data, this.data);
    this._updateID++;
  }
}

export { MeshBatchUvs };
//# sourceMappingURL=MeshBatchUvs.mjs.map
