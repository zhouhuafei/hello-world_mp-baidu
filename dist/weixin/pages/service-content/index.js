import WxParse from '../../templates/wxParse/wxParse';

Page({
    data: {},
    onLoad(options) {
        this.data.options = options;
        this.init();
    },
    onShow() {
    },
    init() {
        const self = this;
        WxParse.wxParse('content', 'html', `<div style="color: red">我是HTML代码</div>`, self);
    },
});
