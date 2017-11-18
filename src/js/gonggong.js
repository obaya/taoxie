

jQuery(function($){

    // 点击回顶部效果
    $('.getBar').on('click','.toTop',function(){
        $('body,html').animate({scrollTop:0});
    })
})