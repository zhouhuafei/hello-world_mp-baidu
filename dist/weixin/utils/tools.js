const extend = require('./extend');
const typeOf = require('./type-of');
const ajax = require('./ajax');

module.exports = {
    ajax,
    extend,
    typeOf,
    keep2decimal(num) {
        return (Math.floor(parseFloat(num) * 1000 / 10) / 100).toFixed(2);
    },
};
