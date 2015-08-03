import Behavior from "./Behavior"

class FixedImage extends Behavior {
	add(element, parameters = {}) {
		const adapter = this.getAdapter();
		const page = adapter.getParent(element, ".page");

		const width = adapter.getWidth(element);
		const height = adapter.getHeight(element);

		adapter.style(element, {
			"position": "absolute",
			"width": parameters.width + "px",
			"height": Math.round((parameters.width / width) * height) + "px",
			"left": Math.round((adapter.getWidth(this.getReflow().getTarget()) - parameters.width) / 2) + "px"
		});

		if (parameters.fix === "top") {
			adapter.style(element, {
				"top": 0
			});
		} else {
			adapter.style(element, {
				"bottom": 0
			});
		}
	}

	update(element, parameters = {}) {
		// TODO
	}

	remove(element) {
		// TODO
	}
}

export default FixedImage;
