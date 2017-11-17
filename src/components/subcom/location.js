export default {
    //    存储数据
    setlocal: function (test) {
        var str = localStorage.getItem("goodsdata");
        str = str || '[]';
        // 将数据转化为数组
        var arr = JSON.parse(str);
        // 将数据追加到原来的数据中
        arr.push(test);
        // 存储数据
        localStorage.setItem("goodsdata", JSON.stringify(arr));

    },
    // 获取数据
    getlocal: function () {
        // 获取原有的数据
        var str = localStorage.getItem("goodsdata");
        //console.log(str)
        str = str || '[]';
        // 将数据转化为数组
        var arr = JSON.parse(str);
        return arr;
    },
    // 删除数据 
    deletelocal: function (goodsid) {
        var arr = this.getlocal();
        for (var i = arr.length - 1; i >= 0; i--) {
            if (arr[i].goodsid == goodsid) {
                arr.splice(i, 1);
            }
        }
        localStorage.setItem('goodsdata', JSON.stringify(arr));
    },
    getShopObj: function () {
        var strObj = this.getlocal();
        var obj = {};
        for (var i = 0; i < strObj.length; i++) {
            var item = strObj[i];
            if (!obj[item.goodsid]) {
                obj[item.goodsid] = item.countval;
            } else {
                obj[item.goodsid] = item.countval + obj[item.goodsid];
            }
        }
        return obj;
    },
    updataObj: function (info) {
        var strObj = this.getlocal();
        var count = 1;
        if (info.type == 'add') {
            strObj.push({ goodsid: info.goodsid, countval: count });
        }
        else {
            for (var i = 0; i < strObj.length; i++) {
                if (info.goodsid == strObj[i].goodsid) {
                    if (strObj[i].countval > 1) {
                        strObj[i].countvel--;
                        break;
                    }
                    else {
                        strObj.splice(i, 1);
                        break;
                    }
                }
            }
        }
        localStorage.setItem('goodsdata', JSON.stringify(strObj));
    }

}