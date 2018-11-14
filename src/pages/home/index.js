import goods from '../../controllers/goods';

Page({
    data: {
        pageBg: 'http://bai-cdn-pic.yuanyuanke.cn/default/2018/11/08/2JEHS8F2AFTKI5B87B2CGVIT9FQD1SI9.png',
        logo: 'http://gss0.baidu.com/9fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/472309f790529822b0b475f0d4ca7bcb0a46d47a.jpg',
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
