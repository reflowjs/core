class Reflow {
    constructor(options = {}) {
        if (options.adapter) {
            this.adapter = options.adapter;
        }

        if (options.target) {
            this.target = options.target;
        }

        this.preloadAhead  = options.preloadAhead || 0;
        this.preloadBehind = options.preloadBehind || 0;
        this.unloadBehind  = options.unloadBehind || 0;
        this.unloadAhead   = options.unloadAhead || 0;

        if (options.animations) {
            this.animations = options.animations;

            this.adapter.each(this.animations, (index, animation) => {
                animation.setReflow(this);
            });
        }

        if (options.behaviors) {
            this.behaviors = new Reflow.Behaviors();
            this.behaviors.setReflow(this);

            this.adapter.each(options.behaviors, (type, behavior) => {
                behavior.setReflow(this);
                this.behaviors.add(type, behavior);
            });
        }

        if (options.pages) {
            this.pages = options.pages;

            this.adapter.each(this.pages, (index, page) => {
                page.setIndex(index);
                page.setReflow(this);

                if (!page.getAnimations() && options.defaults && options.defaults.animations) {
                    page.setAnimations(options.defaults.animations);
                }
            })

            this.updatePage();
        }

        this.hash = document.location.hash.replace("#", "");

        setInterval(() => {
            if (this.hash != document.location.hash.replace("#", "")) {
                this.hash = document.location.hash.replace("#", "");
                this.updatePage();
            }
        }, 100);

        Reflow.instances[options.name || "default"] = this;
    }

    previous() {
        var pages = this.getPages();
        var index = this.getCurrentPage().getIndex();

        if (index > 0 && !this.isLoading) {
            this.showPage(pages[index - 1]);
        }

        return this;
    }

    preloadPrevious() {
        var pages = this.getPages();
        var index = this.getCurrentPage().getIndex();

        if (index > 0 && !this.isLoading) {
            this.preloadPage(pages[index - 1]);
        }

        return this;
    }

    next() {
        var pages = this.getPages();
        var index = this.getCurrentPage().getIndex();

        if (index + 1 < pages.length && !this.isLoading) {
            this.showPage(pages[index + 1]);
        }

        return this;
    }

    preloadNext() {
        var pages = this.getPages();
        var index = this.getCurrentPage().getIndex();

        if (index + 1 < pages.length && !this.isLoading) {
            this.preloadPage(pages[index + 1]);
        }

        return this;
    }

    updatePage() {
        var pages = this.getPages();

        if (!this.adapter) {
            throw new Error("Reflow.adapter is not defined");
        }

        if (document.location.hash.replace("#", "")) {
            this.adapter.each(this.pages, (index, page) => {
                if (page.getHash() == document.location.hash.replace("#", "")) {
                    this.showPage(page);
                }
            });
        } else {
            this.showPage(pages[0]);
        }

        return this;
    }

    updateBehaviors() {
        this.getBehaviors().update();

        return this;
    }

    preloadPage(page, success, failure) {
        var preload = () => {
            var index = page.getIndex();
            var pages = this.getPages();

            var cursor = index;

            while (cursor < index + this.preloadAhead) {
                if (++cursor < pages.length) {
                    if (page[cursor] && !page[cursor].isPreloaded && !page[cursor].isLoading) {
                        pages[cursor].preload();
                    }
                } else {
                    break;
                }
            }

            var cursor = index;

            while (cursor > index - this.preloadBehind) {
                if (--cursor > -1) {
                    if (page[cursor] && !page[cursor].isPreloaded && !page[cursor].isLoading) {
                        pages[cursor].preload();
                    }
                } else {
                    break;
                }
            }
        };

        var preloadSuccess = function() {
            success && success(page);
            preload();
        };

        var preloadFailure = function() {
            failure && failure(page);
            preload();
        };

        if (page.isPreloaded) {
            preloadSuccess();
        } else {
            page.preload(preloadSuccess, preloadFailure);
        }

        return this;
    }

    showPage(page, success, failure) {
        this.currentPage = page;
        this.isLoading  = true;

        if (!this.adapter) {
            throw new Error("Reflow.adapter is not defined");
        }

        var unload = () => {
            var index = page.getIndex();
            var pages = this.getPages();

            var cursor = index - this.unloadBehind;

            while (cursor > -1) {
                if (pages[cursor]) {
                    pages[cursor--].unload();
                }
            }

            var cursor = index + this.unloadAhead;

            while (cursor < pages.length) {
                if (pages[cursor]) {
                    pages[cursor++].unload();
                }
            }
        };

        var unloadSuccess = function() {
            success && success(page);
            unload();
        };

        var unloadFailure = function() {
            failure && failure(page);
            unload();
        };

        return this.preloadPage(
            page,
            () => {
                this.adapter.each(this.pages, (index, other) => {
                    if (other.isVisible) {
                        this.previousPage = other;
                        other.hide();
                    }
                });

                page.show(() => {
                    this.isLoading         = false;
                    this.hash              = page.getHash();
                    document.location.href = "#" + this.hash;
                    unloadSuccess && unloadSuccess();
                });
            },
            () => {
                page.hide(() => {
                    this.isLoading = false;
                    unloadFailure && unloadFailure();
                });
            }
        );
    }

    getBehaviors() {
        return this.behaviors;
    }

    getAdapter() {
        if (this.adapter) {
            return this.adapter;
        }

        throw new Error("Reflow.adapter is not defined");
    }

    setAdapter(adapter) {
        this.adapter = adapter;

        return this;
    }

    setTarget(target) {
        this.target = target;

        return this;
    }

    getTarget() {
        return this.target;
    }

    setAnimations(animations) {
        this.animations = animations;

        return this;
    }

    getAnimations() {
        return this.animations;
    }

    getPreviousPage() {
        return this.previousPage;
    }

    getCurrentPage() {
        return this.currentPage;
    }

    getCurrentPageContainer() {
        return this.getCurrentPage().getContainer();
    }

    getPages() {
        return this.pages;
    }

    getPage(hash) {
        var found = null;

        if (!this.adapter) {
            throw new Error("Reflow.adapter not defined");
        }

        this.adapter.each(this.pages, (index, page) => {
            if (page.getHash() == hash) {
                found = page;
            }
        });

        return found;
    }

    getHash() {
        return this.hash;
    }

    setHash(hash) {
        this.hash = hash;

        return this;
    }

    static getInstance(name = "default") {
        var found = null;

        if (Reflow.instances[name]) {
            found = Reflow.instances[name];
        }

        return found;
    }
}

Reflow.instances = {};

if (typeof window != "undefined") {
    Reflow.Adapter                     = require("./Reflow/Adapter/Adapter");
    Reflow.Adapter.jQuery              = require("./Reflow/Adapter/jQuery");
    Reflow.Animation                   = require("./Reflow/Animation/Animation");
    Reflow.Animation.Fade              = require("./Reflow/Animation/Fade");
    Reflow.Animation.Horizontal        = require("./Reflow/Animation/Horizontal");
    Reflow.Animation.None              = require("./Reflow/Animation/None");
    Reflow.Animation.Vertical          = require("./Reflow/Animation/Vertical");
    Reflow.Behavior                    = require("./Reflow/Behavior/Behavior");
    Reflow.Behavior.Animation          = require("./Reflow/Behavior/Animation/Animation");
    Reflow.Behavior.Animation.FadeIn   = require("./Reflow/Behavior/Animation/FadeIn");
    Reflow.Behavior.Animation.FadeOut  = require("./Reflow/Behavior/Animation/FadeOut");
    Reflow.Behavior.Animation.SlideIn  = require("./Reflow/Behavior/Animation/SlideIn");
    Reflow.Behavior.Animation.SlideOut = require("./Reflow/Behavior/Animation/SlideOut");
    Reflow.Behavior.Background         = require("./Reflow/Behavior/Background");
    Reflow.Behavior.Center             = require("./Reflow/Behavior/Center");
    Reflow.Behavior.Fit                = require("./Reflow/Behavior/Fit");
    Reflow.Behavior.Highlight          = require("./Reflow/Behavior/Highlight");
    Reflow.Behavior.Scale              = require("./Reflow/Behavior/Scale");
    Reflow.Behavior.Swipe              = require("./Reflow/Behavior/Swipe");
    Reflow.Behaviors                   = require("./Reflow/Behaviors");
    Reflow.Page                        = require("./Reflow/Page");

    window.Reflow = Reflow;
}

export default Reflow;
