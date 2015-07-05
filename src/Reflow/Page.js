class Page {
    constructor(options = {}) {
        if (typeof options.index == "number") {
            this.index = options.index;
        }

        if (options.hash) {
            this.hash  = options.hash;
        }

        if (options.resources) {
            this.resources = options.resources;
        }

        if (options.animations) {
            this.animations = options.animations;
        }

        if (options.reflow) {
            this.reflow = options.reflow;
        }

        if (options.target) {
            this.target = options.target;
        }

        this.isPreloaded = false;
        this.isVisible   = false;
    }

    getAdapter() {
        return this.adapter;
    }

    setAdapter(adapter) {
        this.adapter = adapter;

        return this;
    }

    getReflow() {
        return this.reflow;
    }

    setReflow(reflow) {
        this.reflow = reflow

        return this;
    }

    getTarget() {
        return this.target;
    }

    setTarget(target) {
        this.target = target;

        return this;
    }

    getContainer() {
        return this.container;
    }

    getIndex() {
        return this.index;
    }

    getHash() {
        return this.hash;
    }

    getResources() {
        return this.resources;
    }

    getAnimations() {
        return this.animations;
    }

    validate() {
        var reflow           = null;
        var adapter          = null;
        var index            = null;
        var hash             = null;
        var resources        = null;
        var pageAnimations   = null;
        var reflowAnimations = null;
        var container        = null;
        var target           = null;

        if (this.getReflow()) {
            reflow = this.getReflow();
        } else if (Reflow.getInstance()) {
            reflow = Reflow.getInstance();
        }

        if (this.getAdapter()) {
            adapter = this.getAdapter();
        } else if (reflow && reflow.getAdapter()) {
            adapter = reflow.getAdapter();
        }

        if (!adapter) {
            throw new Error("Reflow.Page.adapter not defined");
        }

        if (typeof this.getIndex() == "number") {
            index = this.getIndex();
        }

        if (this.getHash()) {
            hash = this.getHash();
        }

        if (this.getResources()) {
            resources = this.getResources();
        }

        if (this.getAnimations()) {
            pageAnimations = this.getAnimations();
        }

        if (reflow && reflow.getAnimations()) {
            reflowAnimations = reflow.getAnimations();
        }

        if (this.getTarget()) {
            target = this.getTarget();
        } else if (reflow && reflow.getTarget()) {
            target = reflow.getTarget();
        }

        return {
            "reflow"           : reflow,
            "adapter"          : adapter,
            "index"            : index,
            "hash"             : hash,
            "resources"        : resources,
            "pageAnimations"   : pageAnimations,
            "reflowAnimations" : reflowAnimations,
            "target"           : target
        };
    }

    invoke(value) {
        if (typeof value == "function") {
            return value();
        }

        return value;
    }

    preload(success, failure) {
        var data      = this.validate();
        var head      = data.adapter.find("head");
        var failed    = false;
        var completed = 0;

        if (!data.target) {
            throw new Error("Reflow.Page.target not defined");
        }

        if (!data.resources) {
            throw new Error("Reflow.Page.resources not defined");
        }

        if (!data.resources.html) {
            throw new Error("Reflow.Page.resources.html not defined");
        }

        if (!data.resources.css) {
            throw new Error("Reflow.Page.resources.css not defined");
        }

        if (!data.resources.js) {
            throw new Error("Reflow.Page.resources.js not defined");
        }

        data.adapter.request({
            "url"     : data.resources.html,
            "failure" : () => {
                failed = true;
                completed += 1;
            },
            "success" : (response) => {
                completed += 1;
                this.container = data.adapter.createElement(`<div class='page ${data.hash}'>${response}</div>`)
                data.adapter.appendElement(data.target, this.container);
                data.reflow.updateBehaviors();
            }
        });

        data.adapter.request({
            "url"     : data.resources.css,
            "failure" : () => {
                failed = true;
                completed += 1;
            },
            "success" : (response) => {
                completed += 1;

                var element = data.adapter.createElement(`<style>${response}</style>`);

                data.adapter.appendElement(head, element);
            }
        })

        data.adapter.request({
            "url"     : data.resources.js,
            "failure" : () => {
                failed = true;
                completed += 1;
            },
            "success" : (response) => {
                completed += 1;

                var element = data.adapter.createElement(`<script>${response}</script>`);

                data.adapter.appendElement(head, element);
            }
        });

        var check = () => {
            setTimeout(() => {
                if (completed === 3) {
                    if (failed) {
                        this.isPreloaded = false;

                        failure && failure(this);
                    } else {
                        this.isPreloaded = true;

                        data.adapter.trigger(this.container, "reflow-page-load");

                        success && success(this);
                    }
                } else {
                    check();
                }
            }, 10);
        };

        check();

        return this;
    }

    show(callback) {
        var data = this.validate();

        if (!data.pageAnimations) {
            throw new Error("Reflow.Page.animations not defined");
        }

        if (!data.pageAnimations.show) {
            throw new Error("Reflow.Page.animations.show not defined")
        }

        if (!data.reflowAnimations) {
            throw new Error("Reflow.animations not defined");
        }

        if (!data.reflowAnimations[this.invoke(data.pageAnimations.show)]) {
            throw new Error(`Reflow.animations. ${this.invoke(data.pageAnimations.show)} not defined`);
        }

        data.adapter.trigger(this.container, "reflow-page-before-show");

        data.reflowAnimations[data.pageAnimations.show].show(() => {
            this.isVisible = true;

            data.adapter.trigger(this.container, "reflow-page-after-show")

            callback && callback();
        });

        return this;
    }

    hide(callback) {
        var data = this.validate();

        if (!data.pageAnimations) {
            throw new Error("Reflow.Page.animations not defined");
        }

        if (!data.pageAnimations.hide) {
            throw new Error("Reflow.Page.animations.hide not defined");
        }

        if (!data.reflowAnimations) {
            throw new Error("Reflow.animations not defined");
        }

        if (!data.reflowAnimations[this.invoke(data.pageAnimations.hide)]) {
            throw new Error(`Reflow.animations. ${this.invoke(data.pageAnimations.hide)} not defined`)
        }

        data.adapter.trigger(this.container, "reflow-page-before-hide");

        data.reflowAnimations[data.pageAnimations.hide].hide(() => {
            this.isVisible = false;

            data.adapter.trigger(this.container, "reflow-page-after-hide")

            callback && callback();
        })

        return this;
    }
}

export default Page;
