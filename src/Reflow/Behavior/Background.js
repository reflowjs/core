import Behavior from "./Behavior"

class Background extends Behavior {
    add(element, parameters = {}) {
        const adapter = this.getAdapter();
        const page    = adapter.getParent(element, ".page");

        adapter.style(page, {
            "background-image"    : "url(" + adapter.attribute(element, "src") + ")",
            "background-size"     : "cover",
            "background-repeat"   : "no-repeat",
            "background-position" : "center center"
        });

        adapter.style(element, {
            "display" : "none"
        });
    }

    update(element, parameters = {}) {
        // TODO
    }

    remove(element) {
        // TODO
    }
}

export default Background;
