

var config = {
    host: '',
    apiHosts: {
        
    }
};

function extend() {
    var args = arguments, deep = false, dest;
    if (typeof args[0] === 'boolean') {
        deep = Array.prototype.shift.call(args);
    };
    dest = Array.prototype.shift.call(args);
    Array.prototype.forEach.call(args, function (src) {
        Object.keys(src).forEach(function (key) {
            if (deep && typeof src[key] === 'object' && typeof dest[key] === 'object') {
                extend(true, dest[key], src[key]);
            } else if (typeof src[key] !== 'undefined') {
                dest[key] = src[key];
            };
        });
    });
    return dest;
};

module.exports = config;