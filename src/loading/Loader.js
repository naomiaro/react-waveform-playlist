import EventEmitter from "events";

export const STATE_UNINITIALIZED = 0;
export const STATE_LOADING = 1;
export const STATE_DECODING = 2;
export const STATE_FINISHED = 3;

export default class extends EventEmitter {
  constructor(src, audioContext = null) {
    super();
    this.src = src;
    this.ac = audioContext;
    this.audioRequestState = STATE_UNINITIALIZED;
  }

  setStateChange(state) {
    this.audioRequestState = state;
    this.emit("audiorequeststatechange", this.audioRequestState, this.src);
  }

  fileProgress(e) {
    let percentComplete = 0;

    if (this.audioRequestState === STATE_UNINITIALIZED) {
      this.setStateChange(STATE_LOADING);
    }

    if (e.lengthComputable) {
      percentComplete = (e.loaded / e.total) * 100;
    }

    this.emit("loadprogress", percentComplete, this.src);
  }

  fileLoad(e) {
    const audioData = e.target.response || e.target.result;

    this.setStateChange(STATE_DECODING);

    return new Promise((resolve, reject) => {
      this.ac.decodeAudioData(
        audioData,
        audioBuffer => {
          this.audioBuffer = audioBuffer;
          this.setStateChange(STATE_FINISHED);

          resolve(audioBuffer);
        },
        err => {
          reject(err);
        }
      );
    });
  }
}
