jQuery(function($){
    $('.getBar').load('../gonggong.html .blackBar' );
    $('.getHeader').load('../gonggong.html .headerGG' );
    $('.getFooter').load('../gonggong.html .footerGG' );

    // 点击更多出现收起
    var $more = $('.cho_bottom .toggle');
    $more.on('click',function(){
        $more.toggleClass('open');
        if($more.find('em').html()=="更多"){
            $more.find('em').html('收起');
        }else{
            $more.find('em').html('更多');
        }
    })
})