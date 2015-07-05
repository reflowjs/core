import Animation from "./Animation"

class Fade extends Animation {
    show(callback, options = {}) {
        const adapter     = this.getAdapter();
        const currentPage = this.getReflow().getCurrentPage();

        adapter.style(currentPage.getContainer(), {
            "opacity" : 0
        });

        adapter.animate(currentPage.getContainer(), {
            "opacity"  : 1,
            "complete" : callback
        }, options.duration || 250, options.easing || "easeInOutCubic");

        return this;
    }

    hide(callback, options = {}) {
        const adapter      = this.getAdapter();
        const previousPage = this.getReflow().getPreviousPage();

        adapter.style(previousPage.getContainer(), {
            "opacity" : 1
        });

        adapter.animate(previousPage.getContainer(), {
            "opacity"  : 0,
            "complete" : callback
        }, options.duration || 250, options.easing || "easeInOutCubic");

        return this;
    }
}

export default Fade;
