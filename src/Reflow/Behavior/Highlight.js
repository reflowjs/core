import Behavior from "./Behavior"

class Highlight extends Behavior {
    add(element, parameters = {}) {
        const adapter = this.getAdapter();

        adapter.attribute(element, "class", parameters.language);

        const value = adapter.html(element);

        adapter.html(element, this.format(value));

        hljs.highlightBlock(element);

        adapter.trigger("*", "reflow-behavior-center");
    }

    format(value) {
        var lines;
        var offset;

        lines = value.split("\n");

        if (lines.length > 1 && lines[0].trim() === "") {
            lines.shift();
        }

        if (lines.length > 1 && lines[lines.length - 1].trim() === "") {
            lines.pop();
        }

        offset = lines[0].match(/^\s*/)[0].length;

        lines = lines.map(function(line) {
            return line.slice(offset);
        });

        return lines.join("\n");
    }

    update(element, parameters = {}) {
        // TODO
    }

    remove(element) {
        // TODO
    }
}

export default Highlight;
