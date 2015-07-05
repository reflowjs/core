import Animation from "./Animation"

class FadeIn extends Animation {
    add(element, parameters = {}) {
        const adapter = this.getAdapter();

        adapter.bind(element, "reflow-behavior-animation-fade-in-reset", () => {
            adapter.style(element, {
                "opacity" : 0
            });
        });

        adapter.bind(element, "reflow-behavior-animation-fade-in-start", () => {
            adapter.trigger(element, "reflow-behavior-animation-fade-in-reset");

            adapter.animate(element, {
                "opacity" : 1
            }, options.duration || 250, options.easing || "easeInOutCubic");
        });

        return this;
    }

    remove(element, parameters = {}) {
        const adapter = this.getAdapter();

        adapter.unbind(element, "reflow-behavior-animation-fade-in-reset");
        adapter.unbind(element, "reflow-behavior-animation-fade-in-start");

        return this;
    }
}

export default FadeIn;
