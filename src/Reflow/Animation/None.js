import Animation from "./Animation"

class None extends Animation {
    show(callback, options = {}) {
        const adapter      = this.getAdapter();
        const previousPage = this.getReflow().getPreviousPage();
        const currentPage  = this.getReflow().getCurrentPage();

        if (previousPage) {
            adapter.style(previousPage.getContainer(), {
                "opacity" : 0
            });
        }

        adapter.style(currentPage.getContainer(), {
            "opacity" : 1
        });

        callback && callback();

        return this;
    }

    hide(callback, options = {}) {
        const adapter      = this.getAdapter();
        const previousPage = this.getReflow().getPreviousPage();

        adapter.style(previousPage.getContainer(), {
            "opacity" : 0
        });

        callback && callback();

        return this;
    }
}

export default None;
