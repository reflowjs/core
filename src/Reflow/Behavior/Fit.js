import Behavior from "./Behavior"

class Fit extends Behavior {
    add(element, parameters = {}) {
        const adapter = this.getAdapter();
        const page    = this.getReflow().getCurrentPage();
        const width   = adapter.getWidth(page.getContainer());

        adapter.style(element, {
            "overflow"    : "scroll-x",
            "white-space" : "nowrap"
        });

        var last;

        for (var i = 1; i < 20; i++) {
            adapter.style(element, {
                "font-size"   : (i * 10) + "px",
                "line-height" : (i * 10) + "px"
            });

            last = i * 10;

            if (element.offsetWidth > width) {
                break;
            }
        }

        for (var i = 1; i < 50; i++) {
            adapter.style(element, {
                "font-size"   : (last - i) + "px",
                "line-height" : (last - i) + "px"
            });

            if (element.offsetWidth <= width) {
                break;
            }
        }

        adapter.trigger(adapter.getParent(element), "reflow-behavior-center");
    }
}

export default Fit;
