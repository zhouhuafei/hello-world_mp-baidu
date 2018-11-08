
// baidu-valid const config = require('../ext.js');

 const config = wx.getExtConfigSync(); // appid需要授权给第三方之后才能获取到。

module.exports = config;
