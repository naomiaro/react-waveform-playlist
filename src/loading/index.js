import BlobLoader from "./BlobLoader";
import XHRLoader from "./XHRLoader";

export default (src, audioContext) => {
	if (src instanceof Blob) {
		return new BlobLoader(src, audioContext).load();
	} else if (typeof src === "string") {
		return new XHRLoader(src, audioContext).load();
	}

	throw new Error("Unsupported src type");
};
