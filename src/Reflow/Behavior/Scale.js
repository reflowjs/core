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
                    "scale" : [this.scale(), this.scale()]
                });
            }, 300);
        });

        adapter.style(parameters.target, {
            "scale" : [this.scale(), this.scale()]
        });
    }

    scale() {
        const adapter    = this.getAdapter();
        const element    = this.getElement();
        const parameters = this.getParameters();

        return Math.min(
            adapter.getWidth(element) / adapter.getWidth(parameters.target),
            adapter.getHeight(element) / adapter.getHeight(parameters.target)
        );
    }

    remove(element, parameters = {}) {
        const adapter   = this.getAdapter();
        const container = adapter.find(window);

        adapter.unbind(container, ".reflow-behavior-scale");
    }
}

export default Scale;
