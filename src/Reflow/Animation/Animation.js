class Animation {
    constructor(options = {}) {
        if (options.reflow) {
            this.reflow = options.reflow;
        }

        if (options.adapter) {
            this.adapter = options.adapter;
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
}

export default Animation;
