import Behavior from "./Behavior"

class Scale extends Behavior {
    add(element, parameters = {}) {
        const adapter   = this.getAdapter();
        const container = adapter.find(window);

        var timeout = null;

        adapter.bind(container, "resize.reflow-behavior-scale", () => {
            clearTimeout(timeout);

            timeout = setTimeout(() => {
                adapter.animate(parameters.target, {
                    "scale" : [this.scale(element, parameters), this.scale(element, parameters)]
                });
            }, 300);
        });

        adapter.style(parameters.target, {
            "scale" : [this.scale(element, parameters), this.scale(element, parameters)]
        });
    }

    scale(element, parameters = {}) {
        const adapter = this.getAdapter();

        return Math.min(
            adapter.getWidth(element) / adapter.getWidth(parameters.target),
            adapter.getHeight(element) / adapter.getHeight(parameters.target)
        );
    }

    update(element, parameters = {}) {
        // TODO
    }

    remove(element) {
        const adapter   = this.getAdapter();
        const container = adapter.find(window);

        adapter.unbind(container, ".reflow-behavior-scale");
    }
}

export default Scale;
