Page({
    data: {},
    onLoad(options) {
        this.data.options = options;
    },
    onShow() {
        console.log('detail onShow this.data.options', this.data.options);
    },
});
