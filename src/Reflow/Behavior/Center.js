import Behavior from "./Behavior"

class Center extends Behavior {
    add(element, parameters = {}) {
        const adapter = this.getAdapter();

        if (parameters.vertical) {
            const height = adapter.getHeight(element);

            adapter.style(element, {
                "position"   : "absolute",
                "top"        : "50%",
                "margin-top" : - (height / 2) + "px"
            });

            adapter.bind(element, "reflow-behavior-center", function() {
                var newHeight = adapter.getHeight(element);

                if (newHeight !== height) {
                    adapter.style(element, {
                        "margin-top" : - (newHeight / 2) + "px"
                    });
                }
            });
        }

        if (parameters.horizontal) {
            const width = adapter.getWidth(element);

            adapter.style(element, {
                "position"    : "absolute",
                "left"        : "50%",
                "margin-left" : - (width / 2) + "px"
            });

            adapter.bind(element, "reflow-behavior-center", function() {
                var newWidth = adapter.getWidth(element);

                if (newWidth !== width) {
                    adapter.style(element, {
                        "margin-left" : - (newWidth / 2) + "px"
                    });
                }
            });
        }
    }

    update(element, parameters = {}) {
        const adapter = this.getAdapter();

        adapter.trigger(element, "reflow-behavior-center");
    }

    remove(element) {
        // TODO
    }
}

export default Center;
