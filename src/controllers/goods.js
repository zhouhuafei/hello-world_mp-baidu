import {ajax, keep2decimal} from '../utils/tools';

module.exports = {
    list(opts) {
        return ajax({
            url: 'goods/items',
            data: {
                page: opts.page || 1,
                pageSize: opts.pageSize || 10,
            },
            callback: (dataInfo) => {
                if (dataInfo.status === 'success') {
                    const result = dataInfo.result;
                    result.list.map((v) => {
                        v.price = keep2decimal(v.price);
                        v.market_price = keep2decimal(v.market_price);
                        return v;
                    });
                }
                opts.callback(dataInfo);
            },
        });
    },
    detail(opts) { // 商品详情
        return ajax({
            url: `goods/items/${opts.goodsId}`,
            callback(dataInfo) {
                if (dataInfo.status === 'success') {
                    const result = dataInfo.result;
                    result.price = keep2decimal(result.price);
                    result.market_price = keep2decimal(result.market_price);
                }
                opts.callback(dataInfo);
            },
        });
    },
};
