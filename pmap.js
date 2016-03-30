var parser = require('./parser');

var isArray = Array.isArray;

function stringify(value) {
    if (isArray(value)) {
        return JSON.stringify(value.map(function(v) { return stringify(v); })).slice(1, -1);
    }
    else if (typeof value === "object") {
        var from = value.from || 0;
        var range = "" + JSON.stringify(from) + ((value.to !== undefined) ? ".." + value.to : "..." + (value.from + length));
        return range;
    }
    else {
        return JSON.stringify(value);
    }
}

module.exports = function template() {
    var strings = arguments[0];
    var keys = Array.prototype.slice.call(arguments, 1);
    var result = strings.map(function(str, index) {
        var arg = index < keys.length ? stringify(keys[index]) : "";
        return str + arg;
    }).join("");
    //console.log(result);
    return parser.parse(result);
};
