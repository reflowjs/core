import Adapter from "./Adapter"

class jQuery extends Adapter {
    constructor() {
        super();

        if (!$.support.transition) {
            $.fn.transition = $.fn.animate;
        }
    }

    find(selector, elements) {
        if (elements) {
            return $(elements).find(selector);
        }

        return $(selector);
    }

    getWidth(elements) {
        return $(elements).width();
    }

    getHeight(elements) {
        return $(elements).height();
    }

    getLeft(elements) {
        return $(elements).left();
    }

    getTop(elements) {
        return $(elements).top();
    }

    style(elements, styles) {
        return $(elements).css(styles);
    }

    animate(elements, styles, duration, easing) {
        return $(elements).transition(styles, duration, easing);
    }

    data(elements, key, value) {
        return $(elements).data(key, value);
    }

    bind(elements, type, callback) {
        return $(elements).bind(type, callback);
    }

    unbind(elements, type) {
        return $(elements).unbind(type);
    }

    addClass(elements, cls) {
        return $(elements).addClass(cls);
    }

    removeClass(elements, cls) {
        return $(elements).removeClass(cls);
    }

    trigger(elements, type, parameters) {
        return $(elements).trigger(type, parameters);
    }

    preventEventDefault(e) {
        return e.preventDefault();
    }

    stopEventPropagation(e) {
        return e.stopPropagation();
    }

    request(options) {
        return $.ajax({
            "url"      : options.url,
            "dataType" : "text",
            "cache"    : false,
            "success"  : options.success,
            "error"    : options.error
        });
    }

    createElement(html) {
        return $(html);
    }

    appendElement(elements, element) {
        return $(elements).append(element);
    }

    attribute(elements, key, value) {
        if (value) {
            return $(elements).attr(key, value);
        }

        return $(elements).attr(key);
    }

    unique(collection) {
        return $.unique(collection);
    }

    each(collection, callback) {
        return $.each(collection, callback);
    }

    toArray(elements) {
        return $(elements).toArray();
    }

    extend(destination, source) {
        return $.extend(true, destination, source);
    }

    getParent(elements, selector) {
        return $(elements).parent(selector);
    }

    html(element, content) {
        if (content) {
            return $(element).html(content);
        }

        return $(element).html();
    }

    remove(element) {
        $(element).remove();
    }
}

export default jQuery;
