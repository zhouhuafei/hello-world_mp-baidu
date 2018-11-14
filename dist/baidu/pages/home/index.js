import goods from '../../controllers/goods';

Page({
    data: {
        pageBg: 'http://qmfx-s39210.s3.fy.shopex.cn/gpic/20170427/047b64bf5ba53bf3258add6d3cf9c80f.png?imageView2/2/w/346/h/346/interlace/1',
        logo: 'https://avatars1.githubusercontent.com/u/44250517?s=460&v=4',
    },
    onLoad(options) {
        this.data.options = options;
        this.init();
    },
    onShow() {
    },
    init() {
        /*
        goods.list({
            page: 2,
            callback: (dataInfo) => {
                if (dataInfo.status === 'success') {
                    const result = dataInfo.result;
                    this.setData({goodsList: result.list});
                }
            },
        });
        */
    },
});
