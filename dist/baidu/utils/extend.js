/**
 * @description 对象的扩展
 * @param {*} defaults - 默认对象
 * @param {*} inherits - 继承对像
 * @param {Boolean} isDeep - 是否进行深拷贝(默认进行深拷贝)
 * */
function extend(defaults = {}, inherits = {}, isDeep = true) {
    const defaultsType = Object.prototype.toString.call(defaults).slice(8, -1).toLowerCase();
    const inheritsType = Object.prototype.toString.call(inherits).slice(8, -1).toLowerCase();
    if (defaultsType === inheritsType && isDeep) {
        if (defaultsType === 'object' || defaultsType === 'array') { // 当为对象或者为数组
            Object.keys(inherits).forEach(function (attr) {
                const attrDefaultsType = Object.prototype.toString.call(defaults[attr]).slice(8, -1).toLowerCase();
                const attrInheritsType = Object.prototype.toString.call(inherits[attr]).slice(8, -1).toLowerCase();
                if (attrDefaultsType === attrInheritsType && isDeep) { // 类型相同
                    if (attrDefaultsType === 'object' || attrDefaultsType === 'array') { // 当为对象或者为数组
                        extend(defaults[attr], inherits[attr]);
                    } else {
                        if (inherits[attr] !== undefined) { // 过滤掉undefined
                            defaults[attr] = inherits[attr];
                        }
                    }
                } else { // 类型不同,直接后面的覆盖前面的
                    if (inherits[attr] !== undefined) { // 过滤掉undefined
                        defaults[attr] = inherits[attr];
                    }
                }
            });
        } else {
            defaults = inherits;
        }
    } else {
        defaults = inherits;
    }
    return defaults;
}

module.exports = extend;
