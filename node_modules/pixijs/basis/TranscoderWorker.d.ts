import type { BASIS_FORMATS } from './Basis';
import type { ITranscodeResponse } from './TranscoderWorkerWrapper';
/**
 * Worker class for transcoding *.basis files in background threads.
 *
 * To enable asynchronous transcoding, you need to provide the URL to the basis_universal transcoding
 * library.
 * @memberof PIXI.BasisParser
 */
export declare class TranscoderWorker {
    /** URL for the script containing the basis_universal library. */
    static bindingURL: string;
    static jsSource: string;
    static wasmSource: ArrayBuffer;
    private static _onTranscoderInitializedResolve;
    /** a promise that when reslved means the transcoder is ready to be used */
    static onTranscoderInitialized: Promise<void>;
    isInit: boolean;
    load: number;
    requests: {
        [id: number]: {
            resolve: (data: ITranscodeResponse) => void;
            reject: () => void;
        };
    };
    private static _workerURL;
    private static _tempID;
    /** Generated URL for the transcoder worker script. */
    static get workerURL(): string;
    protected worker: Worker;
    protected initPromise: Promise<void>;
    protected onInit: () => void;
    constructor();
    /** @returns a promise that is resolved when the web-worker is initialized */
    initAsync(): Promise<void>;
    /**
     * Creates a promise that will resolve when the transcoding of a *.basis file is complete.
     * @param basisData - *.basis file contents
     * @param rgbaFormat - transcoding format for RGBA files
     * @param rgbFormat - transcoding format for RGB files
     * @returns a promise that is resolved with the transcoding response of the web-worker
     */
    transcodeAsync(basisData: Uint8Array, rgbaFormat: BASIS_FORMATS, rgbFormat: BASIS_FORMATS): Promise<ITranscodeResponse>;
    /**
     * Handles responses from the web-worker
     * @param e - a message event containing the transcoded response
     */
    protected onMessage: (e: MessageEvent) => void;
    /**
     * Loads the transcoder source code
     * @param jsURL - URL to the javascript basis transcoder
     * @param wasmURL - URL to the wasm basis transcoder
     * @returns A promise that resolves when both the js and wasm transcoders have been loaded.
     */
    static loadTranscoder(jsURL: string, wasmURL: string): Promise<[void, void]>;
    /**
     * Set the transcoder source code directly
     * @param jsSource - source for the javascript basis transcoder
     * @param wasmSource - source for the wasm basis transcoder
     */
    static setTranscoder(jsSource: string, wasmSource: ArrayBuffer): void;
}
