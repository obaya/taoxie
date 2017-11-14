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
       
        var $cartBtn = $('.addcart');
        $cartBtn.on('click',function(){
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
       })
        
});