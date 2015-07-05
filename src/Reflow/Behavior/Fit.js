import Behavior from "./Behavior"

class Fit extends Behavior {
    add(element, parameters = {}) {
        const adapter = this.getAdapter();

        adapter.bind(element, "reflow-behavior-fit", () => {
            const page  = adapter.find(".page");
            const width = adapter.getWidth(page);

            adapter.style(element, {
                "overflow"    : "scroll-x",
                "white-space" : "nowrap"
            });

            var last;

            for (var i = 1; i < 50; i++) {
                adapter.style(element, {
                    "font-size"   : (i * 10) + "px",
                    "line-height" : (i * 10) + "px"
                });

                last = i * 10;

                if (element.offsetWidth > width) {
                    break;
                }
            }

            for (var i = 1; i < 100; i++) {
                adapter.style(element, {
                    "font-size"   : (last - i) + "px",
                    "line-height" : (last - i) + "px"
                });

                if (element.offsetWidth <= width) {
                    break;
                }
            }

            adapter.trigger("*", "reflow-behavior-center");
        });

        adapter.trigger(element, "reflow-behavior-fit");
    }

    update(element, parameters = {}) {
        const adapter = this.getAdapter();

        adapter.trigger(element, "reflow-behavior-fit");
    }

    remove(element) {
        // TODO
    }
}

export default Fit;
