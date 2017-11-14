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


    // 放大镜(第一张图片)
    $bli.gdsZoom();
});