// app.js
import md5 from './md5';

const configInfo = wx.getExtConfigSync ? wx.getExtConfigSync() : {};
const config = configInfo.siteInfo || {};
if (!configInfo.siteInfo) {
    wx.reLaunch({ url: 'pages/my/my' });
    wx.showModal({
        title: '提示',
        content: JSON.stringify(configInfo),
    });
}

// const config = {
//   domainPath:'http://api-mstore.weishangye.com/',
//   apiToken:'8pdqc1lugsv0az2ipf4s57ssa7yghiwz',
//   site_id:'438520',
//   api_version:'1.0',
//   api_type:'wechat'
// };

if (!config.domainPath) {
    wx.reLaunch({ url: 'pages/cart/cart' });
    wx.showModal({
        title: '提示',
        content: JSON.stringify(configInfo),
    });
}

// let ajaxList = [];

function interfacePath() {
    return (`${config.domainPath}api/v1/`);
}

function getApiSign(params) { // 接口签名
    let str = '';
    const pDic = Object.keys(params).sort();
    Object.keys(pDic).forEach((key) => {
        str += params[pDic[key]];
    });

    str += config.apiToken;
    return md5(str).toLowerCase();
}

function ajax(options) {
    // options.isOpenId = options.isOpenId || false;
    const openId = wx.getStorageSync('open_id');
    // if (!openId && !options.isOpenId) {
    //   ajaxList.push(options);
    //   if (ajaxList.length <= 1) {
    //     getOpenId(() => {
    //       if (ajaxList.length > 0) {
    //         ajaxList.forEach(item => this.ajax(item));
    //         ajaxList = [];
    //       }
    //     });
    //   }
    //   return;
    // }
    options.url = interfacePath() + options.url;
    options.method = options.type || 'POST';
    options.data = options.data || {};
    options.data.site_id = config.site_id;
    options.data.open_id = openId;
    options.data.api_type = config.api_type;
    options.data.api_version = config.api_version;
    options.data.api_time = Math.round(new Date().getTime() / 1000);
    options.data.ac = getApiSign(options.data);
    // 如果是扫码开店或者是转发开店则带对应的数据过去。
    if (wx.getStorageSync('distributor_id')) {
        options.data.distributor_id = wx.getStorageSync('distributor_id'); // 分销转发开店和扫码开店的数据;
    }
    options.header = {
        'content-type': 'application/x-www-form-urlencoded',
    };
    // site_id     站点id
    // open_id     用户id
    // api_type    接口类型  值 wechat
    // api_version 接口版本  值 1.0
    // api_time    请求时间  值 时间戳
    // ac          验签
    wx.request(options);
}


module.exports = {
    getApiSign,
    ajax,
    interfacePath,
    config,
};
