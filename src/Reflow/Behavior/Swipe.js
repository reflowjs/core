import Behavior from "./Behavior"

class Swipe extends Behavior {
    add(element, parameters = {}) {
        const adapter  = this.getAdapter();
        const distance = options.distance || 10;

        var x = 0;
        var y = 0;

        adapter.bind(element, "mousedown.reflow-behavior-swipe", (e) => {
            x = e.pageX;
            y = e.pageY;
            adapter.preventEventDefault(e);
        });

        adapter.bind(element, "mouseup.reflow-behavior-swipe", (e) => {
            if (Math.abs(e.pageX + x) > distance || Math.abs(e.pageY + y) > distance) {
                adapter.stopEventPropagation(e);
            }
        });

        return this;
    }

    remove(element, parameters = {}) {
        const adapter = this.getAdapter();

        adapter.unbind(element, ".reflow-behavior-swipe");

        return this;
    }
}

export default Swipe;
