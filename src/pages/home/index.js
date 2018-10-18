Page({
    data: {},
    onLoad(options) {
        this.data.options = options;
    },
    onShow() {
        console.log('home onShow this.data.options', this.data.options);
    },
});
