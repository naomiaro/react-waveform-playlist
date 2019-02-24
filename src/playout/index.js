import prepareAudio from "../loading";
import WebAudio from "./webaudio";

const AUDIO_CONTEXT = new AudioContext();

// reference api https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement

export default class {
	load(filenames = []) {
		const buffers = Promise.all(
			filenames.map(file => prepareAudio(file, AUDIO_CONTEXT))
		);

		this.filenames = filenames;
		this.buffers = buffers;

		const sources = buffers.then(buffers =>
			buffers.map(buffer => new WebAudio(AUDIO_CONTEXT, buffer))
		);

		this.sources = sources;
	}

	play() {
		this.playBack = this.sources.then(sources => {
			return sources.map(source => source.setUpSource());
		});

		this.sources.then(sources => {
			sources.forEach(source => source.play(0, 0, source.getDuration()));
		});

		return this.playBack;
	}

	stop() {
		this.sources.then(sources => {
			sources.forEach(source => source.stop());
		});
	}
}
