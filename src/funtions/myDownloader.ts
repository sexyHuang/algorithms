enum HeaderProps {
  contentType = 'content-type',
  contentLength = 'content-length'
}
enum DownloadStatus {
  UN_START,
  PENDING,
  FULFILLED,
  REJECTED
}
type OnProgress = (payload: {
  status: DownloadStatus;
  receivedSize: number;
  totalSize: number;
}) => void;

class Download {
  private aborter?: AbortController;
  private readonly input: RequestInfo;
  private readonly init?: RequestInit;
  private done = false;
  private receivedSize = 0;
  private totalSize = 0;
  private contentType = '';
  private _status = DownloadStatus.UN_START;
  private onProgressCb: OnProgress[] = [];
  private chunks: Uint8Array[] = [];
  private request?: Promise<Response>;
  constructor(input: RequestInfo, init?: RequestInit) {
    this.input = input;
    this.init = init;
  }
  start() {
    if (this.done) {
      return Promise.reject(new Error('The chunks have been piped out'));
    }
    if (!this.aborter || this.aborter.signal.aborted) {
      this.aborter = new AbortController();
      const { headers = {}, ...init } = this.init ?? {};
      this.request = fetch(this.input, {
        ...init,
        headers: {
          ...headers,
          ...(this.receivedSize
            ? {
                Range: `bytes=${this.receivedSize}`
              }
            : false)
        },
        signal: this.aborter.signal
      })
        .then(res => {
          const totalSize = Number(res.headers.get(HeaderProps.contentLength));
          this.contentType = res.headers.get(HeaderProps.contentType) ?? '';
          if (!this.totalSize) this.totalSize = totalSize;
          else if (this.totalSize === totalSize) this.reset();

          return res.body?.getReader();
        })
        .then(this.readChunks)
        .then(chunks => {
          const stream = new ReadableStream({
            start(controller) {
              while (chunks.length) {
                controller.enqueue(chunks.shift()!);
              }
              controller.close();
            }
          });
          return new Response(stream, {
            headers: {
              [HeaderProps.contentLength]: this.contentType,
              [HeaderProps.contentLength]: `${this.totalSize}`
            }
          });
        })
        .catch(e => {
          this.abort();
          this.aborter = void 0;
          throw e;
        });
    }
    this._status = DownloadStatus.PENDING;
    return this.request!;
  }
  private readChunks(
    reader?: ReadableStreamDefaultReader<Uint8Array>
  ): Promise<Uint8Array[]> {
    if (!reader) return Promise.reject(new Error('this request without body'));
    return reader.read().then(result => {
      if (result.done) {
        this.done = true;
        return this.chunks;
      }
      this.receivedSize += result.value.length;
      this.chunks.push(result.value);
      this.onProgressCb.forEach(cb =>
        cb({
          status: this._status,
          receivedSize: this.receivedSize,
          totalSize: this.totalSize
        })
      );
      return this.readChunks(reader);
    });
  }

  onProgress(cb: OnProgress) {
    this.onProgressCb.push(cb);
    return () => {
      this.onProgressCb.filter(_cb => _cb !== cb);
    };
  }
  abort() {
    this.aborter?.abort();
  }
  private reset() {
    this.receivedSize = 0;
    this.chunks = [];
  }
}
