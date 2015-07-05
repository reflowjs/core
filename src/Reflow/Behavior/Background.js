import Behavior from "./Behavior"

class Background extends Behavior {
    add(element, parameters = {}) {
        const adapter = this.getAdapter();
        const page    = this.getReflow().getCurrentPage();

        adapter.style(page.getContainer(), {
            "background-image"    : "url(" + adapter.attribute(element, "src") + ")",
            "background-size"     : "cover",
            "background-repeat"   : "no-repeat",
            "background-position" : "center center"
        });

        adapter.style(element, {
            "display" : "none"
        });
    }
}

export default Background;
