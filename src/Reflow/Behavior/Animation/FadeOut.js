import Animation from "./Animation"

class FadeOut extends Animation {
    add(element, parameters = {}) {
        const adapter = this.getAdapter();

        adapter.bind(element, "reflow-behavior-animation-fade-out-reset", () => {
            adapter.style(element, {
                "opacity" : 1
            });
        });

        adapter.bind(element, "reflow-behavior-animation-fade-out-start", () => {
            adapter.trigger(element, "reflow-behavior-animation-fade-out-reset");

            adapter.animate(element, {
                "opacity" : 0
            }, options.duration || 250, options.easing || "easeInOutCubic");
        });

        return this;
    }

    update(element, parameters = {}) {
        // TODO
    }

    remove(element) {
        const adapter = this.getAdapter();

        adapter.unbind(element, "reflow-behavior-animation-fade-out-reset");
        adapter.unbind(element, "reflow-behavior-animation-fade-out-start");

        return this;
    }
}

export default FadeOut;
