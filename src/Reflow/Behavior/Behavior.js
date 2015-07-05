class Behavior {
    constructor(options = {}) {
        if (options.reflow) {
            this.reflow = options.reflow;
        }

        if (options.adapter) {
            this.adapter = options.adapter;
        }

        if (options.element) {
            this.element = options.element;
        }

        if (options.parameters) {
            this.parameters = options.parameters;
        }

        if (options.page) {
            this.page = options.page;
        }
    }

    setReflow(reflow) {
        this.reflow = reflow;

        return this;
    }

    getReflow() {
        if (this.reflow) {
            return this.reflow;
        }

        return Reflow.getInstance();
    }

    setAdapter(adapter) {
        this.adapter = adapter;

        return this;
    }

    getAdapter() {
        if (this.adapter) {
            return this.adapter;
        }

        return this.getReflow().getAdapter();
    }

    getElement() {
        return this.element;
    }

    setElement(element) {
        this.element = element;

        return this;
    }

    getParameters() {
        return this.parameters;
    }

    setParameters(parameters) {
        this.parameters = parameters;

        return this;
    }

    getPage() {
        return this.page;
    }

    setPage(page) {
        this.page = page;

        return this;
    }

    add(options = {}) {
        throw new Error("Reflow.Behavior.add not defined");
    }

    update(options = {}) {
        throw new Error("Reflow.Behavior.update not defined");
    }

    remove(options = {}) {
        throw new Error("Reflow.Behavior.remove not defined");
    }
}

export default Behavior;
