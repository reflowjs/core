import Behavior from "./Behavior"

class Highlight extends Behavior {
    add(element, parameters = {}) {
        const adapter = this.getAdapter();

        adapter.attribute(element, "class", parameters.language);

        hljs.highlightBlock(element);
    }
}

export default Highlight;
