import Animation from "./Animation"

class SlideOut extends Animation {
    add(element, parameters = {}) {
        const adapter = this.getAdapter();
        const left    = adapter.getLeft(element);
        const top     = adapter.getTop(element);

        adapter.bind(element, "reflow-behavior-animation-slide-out-reset", () => {
            if (options.origin === "left" || options.origin === "right") {
                adapter.style(element, {
                    "left" : left
                });
            }

            if (options.origin === "top" || options.origin === "bottom") {
                adapter.style(element, {
                    "top" : top
                });
            }
        });

        adapter.bind(element, "reflow-behavior-animation-slide-out-start", () => {
            adapter.trigger(element, "reflow-behavior-animation-slide-out-reset");

            if (options.origin === "left") {
                adapter.animate(element, {
                    "left" : - adapter.getWidth(element)
                }, options.duration || 250, options.easing || "easeInOutCubic");
            }

            if (options.origin === "right") {
                adapter.animate(element, {
                    "left" : adapter.getWidth(parameters.target)
                }, options.duration || 250, options.easing || "easeInOutCubic");
            }

            if (options.origin === "top") {
                adapter.animate(element, {
                    "top" : - adapter.getHeight(element)
                }, options.duration || 250, options.easing || "easeInOutCubic");
            }

            if (options.origin === "bottom") {
                adapter.animate(element, {
                    "top" : adapter.getHeight(parameters.target)
                }, options.duration || 250, options.easing || "easeInOutCubic");
            }
        });

        return this;
    }

    remove(element, parameters = {}) {
        const adapter = this.getAdapter();

        adapter.unbind(element, "reflow-behavior-animation-slide-out-reset");
        adapter.unbind(element, "reflow-behavior-animation-slide-out-start");

        return this;
    }
}

export default SlideOut;
