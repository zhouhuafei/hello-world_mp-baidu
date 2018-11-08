const extend = require('./extend');
const typeOf = require('./type-of');
const {siteInfo} = require('./config');

module.exports = function (opts) {
    const apiDataFormat = { // 基本数据格式
        status: 'failure', // 接口的三种状态：success(请求成功-业务成功) failure(请求成功-业务失败) error(请求错误)
        message: '请求失败', // 提示信息
        failureInfo: null, // 失败信息
        failureCode: null, // 失败码
        errorInfo: null, // 错误信息
        errorCode: null, // 错误码
        result: {}, // 请求结果
    };
    opts.method = (opts.method || opts.type || 'GET').toUpperCase(); // 必须大写
    opts.data = typeOf(opts.data) !== 'object' ? {} : opts.data; // 百度小程序不传会报错。
    opts = extend({
        url: null,
        method: null,
        data: null,
        isHandleError: true, // 是否处理错误
        isHandleFailure: true, // 是否处理失败
        isHandleSuccess: false, // 是否处理成功
        callback: function () { // 请求错误
        },
        success: function (res) { // 请求成功
            let dataInfo = res.data;
            if (!dataInfo.error) { // 请求成功-业务成功
                dataInfo.result = dataInfo.data;
                dataInfo.status = 'success';
                dataInfo.message = '请求成功';
                if (opts.isHandleSuccess) {
                    wx.showToast({title: '操作成功', icon: 'none', duration: 3000});
                }
            }
            if (dataInfo.error) { // 请求成功-业务失败
                dataInfo = extend(dataInfo, dataInfo.error);
                dataInfo.status = 'failure';
                if (opts.isHandleFailure) {
                    wx.showToast({title: '操作失败', icon: 'none', duration: 3000});
                }
            }
            opts.callback(extend(apiDataFormat, dataInfo));
        },
        fail: function (err) { // 请求错误
            const dataInfo = {
                status: 'error',
                message: err.errMsg,
                errorInfo: err.errMsg,
                errorCode: err.errCode,
            };
            if (opts.isHandleError) {
                wx.showToast({title: `${dataInfo.errorCode}：${err.errMsg}`, icon: 'none', duration: 3000});
            }
            opts.callback(extend(apiDataFormat, dataInfo));
        },
        complete: function () { // success和fail以及complete函数的回调中this指向global
        },
    }, opts);
    opts.url = `${siteInfo.domainPath}index.php/api/wxapp/${opts.url}`;
    // console.log('ajax opts', opts);
    return wx.request(opts);
};
