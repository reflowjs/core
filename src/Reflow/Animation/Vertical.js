import Animation from "./Animation"

class Vertical extends Animation {
    show(callback, options = {}) {
        const adapter      = this.getAdapter();
        const previousPage = this.getReflow().getPreviousPage();
        const currentPage  = this.getReflow().getCurrentPage();

        if (previousPage) {
            if (previousPage.getIndex() < currentPage.getIndex()) {
                adapter.style(currentPage.getContainer(), {
                    "top" : adapter.getHeight(currentPage.getContainer())
                });

                adapter.animate(currentPage.getContainer(), {
                    "top"      : 0,
                    "complete" : callback
                }, options.duration || 250, options.easing || "easeInOutCubic");
            } else {
                adapter.style(currentPage.getContainer(), {
                    "top" : - adapter.getHeight(currentPage.getContainer())
                });

                adapter.animate(currentPage.getContainer(), {
                    "top"      : 0,
                    "complete" : callback
                }, options.duration || 250, options.easing || "easeInOutCubic");
            }
        } else {
            adapter.style(currentPage.getContainer(), {
                "top"     : 0,
                "opacity" : 0
            });

            adapter.animate(currentPage.getContainer(), {
                "opacity"  : 1,
                "complete" : callback
            }, options.duration || 250, options.easing || "easeInOutCubic");
        }

        return this;
    }

    hide(callback, options = {}) {
        const adapter      = this.getAdapter();
        const previousPage = this.getReflow().getPreviousPage();
        const currentPage  = this.getReflow().getCurrentPage();

        if (previousPage) {
            if (previousPage.getIndex() < currentPage.getIndex()) {
                adapter.style(previousPage.getContainer(), {
                    "top" : 0
                });

                adapter.animate(previousPage.getContainer(), {
                    "top"      : - adapter.getHeight(previousPage.getContainer()),
                    "complete" : callback
                }, options.duration || 250, options.easing || "easeInOutCubic");
            } else {
                adapter.style(previousPage.getContainer(), {
                    "top" : 0
                });

                adapter.animate(previousPage.getContainer(), {
                    "top"      : adapter.getHeight(previousPage.getContainer()),
                    "complete" : callback
                }, options.duration || 250, options.easing || "easeInOutCubic");
            }
        } else {
            adapter.style(previousPage.getContainer(), {
                "top"     : 0,
                "opacity" : 1
            });

            adapter.animate(previousPage.getContainer(), {
                "opacity"  : 0,
                "complete" : callback
            }, options.duration || 250, options.easing || "easeInOutCubic");
        }

        return this;
    }
}

export default Vertical;
