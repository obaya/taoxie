jQuery(function($){
    $('.getBar').load('../gonggong.html .blackBar' );
    $('.getHeader').load('../gonggong.html .headerGG' );
    $('.getFooter').load('../gonggong.html .footerGG' );

    // 实现点击小图切换对应的大图
    var $sli = $('.smaller li');
    var $bli = $('.bigger li');
    // 隐藏所有的.content
    
    
    $bli.slice(1).hide();
  
    $sli.first().addClass('gaoliang');

    // 点击标签切换
    $sli.on('mouseenter',function(){
        $(this).addClass('gaoliang').siblings().removeClass('gaoliang');
        var idx = $(this).index();
        $bli.eq(idx).show().siblings('li').hide();
    })


    // 放大镜
    $bli.gdsZoom();


    
    // 点击color下面的图片时高亮
    var boo;
    $('.color').on('click','dd',function(e){
        $(this).siblings().removeClass()
        $(this).toggleClass('gaoliang');
        e.preventDefault();
        boo = $('.color').find('dd').hasClass('gaoliang');
    })

    // 点击size高亮
    var boo1;
    $('.size').on('click','dd',function(e){
        $(this).siblings().removeClass()
        $(this).toggleClass('gaoliang');
        e.preventDefault();
        boo1 = $('.size').find('dd').hasClass('gaoliang')
 
    })

    // 实现+-的点击增加或减少数字
    
        $('.decrease').on('click',function(e){
            var $num = $('.qty input').val();
            if( !boo || !boo1 ){
                $('.qty span').text('请选择好颜色和尺码');
            }else{
                $('.qty span').text('');
                $num--;
                if($num<=1){
                    $num=1;
                    $('.qty span').text('不能再少啦');
                }
                $('.qty input').val($num);
                e.preventDefault();
            }
           
        })
        $('.increase').on('click',function(e){
            var $num = $('.qty input').val();
            if( !boo || !boo1 ){
                $('.qty span').text('请选择好颜色和尺码');
            }else{
                $('.qty span').text('');
                $num++;
                e.preventDefault();
                $('.qty input').val($num);
                
            }
            
        })      
    
       // 加入购物车效果
       // 点击addcart按钮，复制有class=高亮的图片
       // 避免覆盖先获取页面上的所有cookie
        var goodslist = obj.get('goodslist');
       
       if(!goodslist){
            goodslist = [];
        }else{
            goodslist = JSON.parse(goodslist);
        }
        var $cartBtn = $('.addcart');
        $cartBtn.on('click',function(e){
            e.preventDefault();
            if( !boo || !boo1 ){
                $('.qty span').text('请选择好颜色和尺码');
            }else{
                $('.qty span').text('');
                var $goods = $('.color .gaoliang');
                var $img = $goods.find('img');
                // 复制这张图片
                $cloneImg = $img.clone();
                // 给图片定位
                $cloneImg.css({
                    position:'absolute',
                    left:$img.offset().left,
                    top:$img.offset().top,
                    width:$img.width()
                })
                // 写入body
                $cloneImg.appendTo('body');
                // 图片跑到购物车的动画
                var $cart = $('.cartR');
                 $cloneImg.animate({left:$cart.offset().left+$cart.height()/2,top:$cart.offset().top+$cart.height()/2,width:10},800,function(){
                    // 删除复制的图片
                    $cloneImg.remove();

                    // 购物车中的数字加input框中的数
                    var $qty = Number($cart.find('span').text());
                    $qty += Number($('.qty input').val());

                    $cart.find('span').text($qty);

                });
                
            }

            // 点击加购时将商品颜色和尺码传入car.php以获取商品信息写入cookie
            // color下的.gaoliang下面的em的innerHTML
            var c = $('.chooseI .color .gaoliang em').html();
            var s = $('.chooseI .size .gaoliang a').html();
            // console.log(c,s)
            ajax({
                type:'get',
                url:`http://localhost:3333/api/car.php?color=${c}&size=${s}`,
                async:true,
                success:function(data){//data是一个对象
                    // 把数量加上去
                    data['num'] = (Number($('#quantity').val()));
                    
                    // goodslist.push(data);
                    // // 判断当前商品是否存在cookie
                    var currentIdx;//用这个变量去接收索引值，好拿到对应的qty
                    
                    var res = goodslist.some(function(item,idx){
                        currentIdx = idx;
                        return (item.guidID == data.guidID)
                       
                    })
                    // console.log(goodslist)
                    if(res){
                        goodslist[currentIdx].num += Number($('#quantity').val());
                    }else{
                        goodslist.push(data);
                        
                    }
                    
                    // 商品存在购物车中的时间
                    var now = new Date();
                    now.setDate(now.getDate()+365);
                    // 把商品信息写入cookie
                    obj.set('goodslist',JSON.stringify(goodslist),now); 
                    
                }
            })



        })

        // 这里应该通过传过来的id再向后台请求商品信息然后写入页面
        // 获取列表页传递过来的url
        var params = location.search;

        // 去掉问号
        params=params.slice(1);//params:id=1

        var arr = params.split('=');

        var id = arr[1];
        
        // 将id传给goods.php
        ajax({
            type:'get',
            url:`http://localhost:3333/api/goods.php?id=${id}`,
            async:true,
            success:function(data){
                console.log(data)//这里的data是一个对象
                // data为每一个商品的详细信息
                $('.getData').get(0).innerHTML = `<h1>${data.title} </h1>
                <div class="info" data-guid="${data.id}">
                <div class="d-price">
                    <label>淘鞋价：</label>
                    <span class="realP">${data.nPrice} </span> 
                </div>

                <div class="marketP">
                    <label>专柜价：</label>
                    <del>${data[4]}</del>元(5.0折&nbsp;省120元&nbsp;单件送 <em>1</em> 鞋币)
                </div>
                <div>物流费用：全场包邮(不包括货到付款)</div>
                <div style="color:red">温馨提示：本款不支持货到付款和顺丰快递 </div>

                <div class="pjia">商品评分：
                    <span class="star star-5"></span>5.0(<a id="t_CommentTab" href="#">已有0人评价</a>)
                </div>
            </div>`      
                
            }
        });
        

        // 现在data是数据库中写入的商品信息
        // 将商品信息写入页面
       
        
            
     
        

        
});