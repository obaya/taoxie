jQuery(function($){
    // 提取cookie
    var goodslist = obj.get('goodslist');
    console.log(typeof(goodslist));//string

    // 将goodslist转为数组
    if(goodslist){
        goodslist=JSON.parse(goodslist);
        console.log(typeof(goodslist));//obj

        var total = 0;
        // 遍历数组写入页面
        var res = goodslist.map(function(item){
            console.log(item)

            total+=item[6]*item[8];

            // total+=item.price*item.qty;
            // item是一个数组，包含所有的商品信息
            return `<tr>
                <td class="checkbox"><input type="checkbox" title="全选" id="checkAll" /></td>
                <td>
                    <img src="${item[2]}" />
                </td>
                <td class="title">
                    <a href="">${item[3]}</a>
                    <p>颜色：${item[4]} 尺码：${item[5]}</p>
                </td>
                <td class="price">
                    <span>${item[6]}</span>
                </td>
                <td>-</td>
                <td class="qty">
                    <div>
                        <a class="left" href=""></a>
                        <input type="text" value="${item[8]}"/>
                        <a  class="right" href=""></a>
                    </div>
                </td>
                <td>
                    <span>${total}.00</span>
                </td>
                
                <td>
                    <a href="">删除</a>
                </td>


            </tr>`

        }).join('');
        $('.cargoods').html(res);
    }
})