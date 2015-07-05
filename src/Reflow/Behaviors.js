class Behaviors {
    constructor(options = {}) {
        if (options.adapter) {
            this.adapter = options.adapter;
        }

        if (options.reflow) {
            this.reflow = options.reflow;
        }

        this.behaviors = {};

        if (options.behaviors) {
            this.behaviors = options.behaviors;
        }
    }

    walk(parts, value) {
        var stack = {};
        var part  = parts.shift();

        if (parts.length) {
            stack[part] = this.walk(parts, value);
        } else {
            stack[part] = value;
        }

        return stack;
    }

    namespace(element, type) {
        const adapter    = this.getAdapter();
        const prefix     = "data-" + type + "-";
        const parameters = {};

        adapter.each(element.attributes, (index, attribute) => {
            const name = attribute.name;

            if (name.indexOf(prefix) > -1) {
                const parts = name.replace(prefix, "").split("-");

                adapter.extend(
                    parameters,
                    this.walk(parts, adapter.attribute(element, name))
                );
            }
        });

        return parameters;
    }

    getAdapter() {
        if (this.adapter) {
            return this.adapter;
        }

        return this.getReflow().getAdapter();
    }

    setAdapter(adapter) {
        this.adapter = adapter;

        return this;
    }

    getReflow() {
        if (this.reflow) {
            return this.reflow;
        }

        return Reflow.getInstance();
    }

    setReflow(reflow) {
        this.reflow = reflow;

        return this;
    }

    getBehaviors() {
        return this.behaviors;
    }

    add(type, behavior) {
        const adapter  = this.getAdapter();
        const elements = adapter.toArray(adapter.find("[data-behaviors~='"  + type + "']"));

        adapter.each(elements, (index, element) => {
            this.forward(behavior, "add", element, this.namespace(element, type));
            elements.push(element);
        });

        this.behaviors[type] = {
            "instance" : behavior,
            "elements" : elements
        };

        return this;
    }

    forward(behavior, method, element, parameters) {
        const reflow = this.getReflow();
        const page   = reflow.getCurrentPage();

        behavior.setElement(element);
        behavior.setParameters(parameters);
        behavior.setPage(page);

        behavior[method].apply(behavior, [element, parameters]);
    }

    remove(type) {
        const adapter  = this.getAdapter();
        const behavior = this.behaviors[type];

        adapter.each(behavior.elements, (index, element) => {
            this.forward(behavior, "remove", element);
        });

        delete this.behaviors[type];

        return this;
    }

    update() {
        const adapter   = this.getAdapter();
        const behaviors = this.getBehaviors();

        adapter.each(behaviors, (type, behavior) => {
            const elements = adapter.toArray(adapter.find("[data-behaviors~='"  + type + "']"));

            adapter.each(elements, (index, element) => {
                if (behavior.elements.indexOf(element) === -1) {
                    this.forward(behavior.instance, "add", element, this.namespace(element, type));
                    behavior.elements.push(element);
                } else {
                    this.forward(behavior.instance, "update", element, this.namespace(element, type));
                }
            });

            adapter.each(behavior.elements, (index, element) => {
                if (elements.indexOf(element) === -1) {
                    this.forward(behavior.instance, "remove", element);
                    behavior.elements.splice(behavior.elements.indexOf(element), 1);
                }
            });
        });

        return this;
    }
}

export default Behaviors;
