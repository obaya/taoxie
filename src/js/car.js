
require(['config'],function(){
    requirejs(['jquery'],function($){
        require(['common'],function(cm){
        // 提取cookie
            var goodslist = obj.get('goodslist');
            //console.log(typeof(goodslist));//string

            // 将goodslist转为数组
            if(goodslist){
                goodslist=JSON.parse(goodslist);
                //console.log(typeof(goodslist));//obj

                var total = 0;
                // 遍历数组写入页面
                var res = goodslist.map(function(item){
                    total=item.price*item.num;

                    // total+=item.price*item.qty;
                    // item是一个数组，包含所有的商品信息
                    return `<tr class="${item.guidID}">
                        <td class="checkbox"><input type="checkbox" title="全选" class="checkbox1" id="checkAll" /></td>
                        <td>
                            <img src="${item.imgurl}" />
                        </td>
                        <td class="title">
                            <a href="">${item.title}</a>
                            <p>颜色：${item.color} 尺码：${item.size}</p>
                        </td>
                        <td class="price">
                            <span>${item.price}</span>
                        </td>
                        <td>-</td>
                        <td class="qty">
                            <div>
                                <a class="left" href=""></a>
                                <input type="text" value="${item.num}"/>
                                <a  class="right" href=""></a>
                            </div>
                        </td>
                        <td class="total">
                            <span>${total}.00</span>
                        </td>
                        
                        <td class="del">
                            <a href="">删除</a>
                        </td>
                    </tr>`

                }).join('');
                $('.cargoods').html(res);
            }


            /*
                
                
                
             */
            // 隔行换色
            var $tr = $('tbody.cargoods tr');
            for(var i=0;i<$tr.get().length;i++){
                if(i%2!=0){
                   $tr.get(i).className = 'even'; 
                }
            }
            
            var total = 0;
            var jianshu = 0;
            // 如果当前checkbox勾选，当前tr高亮,并且加总选中的合计项
            $('.checkbox .checkbox1').on('click',function(){
                var a = Number($(this).parent('.checkbox').siblings('.total').text());
                var b = Number($(this).parent('.checkbox').siblings('.qty').find('input').val());
                if($(this).prop('checked')){
                    $(this).parent('.checkbox').closest('tr').addClass('selected');
                    total += a;
                    jianshu += b;




                }else{
                    $(this).parent('.checkbox').closest('tr').removeClass('selected');
                    total -= a;
                    jianshu -= b;
                }
                // 将总价写入页面
                $('tfoot #amountCash').html(total.toFixed(2)).css({'color':'red'});
                $('.last_f #totalCash').html(total.toFixed(2)).css({'color':'red'});
                $('tfoot #totalQuantity').html(jianshu);
            })  

            // 封装一个函数，加总选中的项的合计，在点击左右按钮时也执行这个函数，写入页面


           // 全选/不选
            $('#checkAll').on('click',function(){
                // 判断全选勾选框是否选中状态
                $('table tbody tr')[this.checked ? 'addClass' : 'removeClass']('selected');
                $('table tbody tr').find(':checkbox').prop('checked',this.checked);//this.checked是true则全部勾上，否则全部取消。this.check返回的就是布尔类型值
            })
                    
           // 点击left，right做相应的数量加减，
           $('.qty').on('click','.left',function(e){
                var $num = $(this).next('input').val();
                if( $num<=1 ){
                    $num = 1;
                }else{
                    $num--;
                }
                    $(this).next('input').val($num);
                    e.preventDefault();
                    heji();
                
               
            })
            $('.qty ').on('click','.right',function(e){
                var $num =$(this).prev('input').val();
                $num++;
                e.preventDefault();
                $(this).prev('input').val($num);
                heji();
            })

            // 合计项

            // 遍历tr,得到单项合计
            var heji = function(){
                $('table .cargoods tr').each(function(idx,ele){
                    // var current = $(ele).find(':checkbox').prop('checked');//
                    var $price = $(this).find('.price').find('span').text();
                    var $qty = $(this).find('.qty').find('input').val();
                    var $total = ($price*$qty).toFixed(2);

                   $(this).find('.total').find('span').html($total);

                    
                })
                
            }

                // 点击右侧删除按钮删除当前tr并清除cookie
                // 点xx的时候删除对应的cookie
                $('.cargoods .del').on('click','a',function(e){
                    e.preventDefault();
                    var $currentTr = $(this).closest('tr');
                    $currentTr.get(0).parentNode.removeChild($currentTr.get(0));
                    // 同时还要删除cookie
                    // 事先要给每个tr设置独有的标识，如class=guidID
                    // 遍历cookie找出当前tr
                    for(var i=0;i<goodslist.length;i++){
                        if($currentTr.attr('class') == goodslist[i].guidID ){
                            // 把该项cookie删除
                            goodslist.splice(i,1);
                            // 再重新设置cookie
                            obj.set('goodslist',JSON.stringify(goodslist))                          
                        }
                        if(goodslist.length==0){
                            obj.remove('goodslist') 
                        }
                        location.reload();
                    }

                    
                })
       })
        

    })
})
