import Animation from "./Animation"

class SlideIn extends Animation {
    add(element, parameters = {}) {
        const adapter = this.getAdapter();
        const left    = adapter.getLeft(element);
        const top     = adapter.getTop(element);

        adapter.bind(element, "reflow-behavior-animation-slide-in-reset", () => {
            if (options.origin === "left") {
                adapter.style(element, {
                    "left" : - adapter.getWidth(element)
                });
            }

            if (options.origin === "right") {
                adapter.style(element, {
                    "left" : adapter.getWidth(parameters.target)
                });
            }

            if (options.origin === "top") {
                adapter.style(element, {
                    "top" : - adapter.getWidth(element)
                });
            }

            if (options.origin === "bottom") {
                adapter.style(element, {
                    "top" : adapter.getWidth(parameters.target)
                });
            }
        });

        adapter.bind(element, "reflow-behavior-animation-slide-in-start", () => {
            adapter.trigger(element, "reflow-behavior-animation-slide-in-reset")

            if (options.origin === "left" || options.origin === "right") {
                adapter.animate(element, {
                    "left" : left
                }, options.duration || 250, options.easing || "easeInOutCubic");
            }

            if (options.origin === "top" || options.origin === "bottom") {
                adapter.animate(element, {
                    "top" : top
                }, options.duration || 250, options.easing || "easeInOutCubic");
            }
        });

        return this;
    }

    remove(element, parameters = {}) {
        const adapter = this.getAdapter();

        adapter.unbind(element, "reflow-behavior-animation-slide-in-reset");
        adapter.unbind(element, "reflow-behavior-animation-slide-in-start");

        return this;
    }
}

export default SlideIn;
