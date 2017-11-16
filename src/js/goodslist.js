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


    // 从后台获取数据写入页面
    // 设置分页号
    var pageNo = 1;
    var qty = 20;
    ajax({
        type:'get',
        url:`http://localhost:3333/api/list.php?pageNo=${pageNo}&qty=${qty}`,
        async:true,
        success:function(data){
            var $goodslist = $('.goodsList');
            var res = data.data.map(function(item){
                // console.log(item)
                return `<li><div class="box_over">
                    <div class="bImg"><a href=""><img src="${item.imgurl}" /></a></div>
                    <div class="sImg"><a href=""><img src="${item.sImgurl}" /></a></div>
                    <div><span class="np">￥${item.nPrice}</span><span class="bp">￥${item.bPrice}</span></div>
                    <div class="title"><a href="">${item.title}</a></div>
                    <div class="size">${item.size}</div> 
                    </div></li>`
            }).join('');
            $goodslist.get(0).innerHTML = '';
            $goodslist.html(res);
            
        }
    });

    // 点击下一页的时候请求页面至下一页的内容
    var $next = $('.a_t_right .next');
    var $prev = $('.a_t_right .prev');
    $prev.css({'color':'#ccc'})
    $next.on('click',function(e){
        e.preventDefault();
        $prev.css({'color':'#000'})
        pageNo++;
        

        // 重新将请求发送出去
        ajax({
            type:'get',
            url:`http://localhost:3333/api/list.php?pageNo=${pageNo}&qty=${qty}`,
            async:true,
            success:function(data){
                var $goodslist = $('.goodsList');
                var res = data.data.map(function(item){
                    // console.log(item)
                    return `<li><div class="box_over">
                        <div class="bImg"><a href=""><img src="${item.imgurl}" /></a></div>
                        <div class="sImg"><a href=""><img src="${item.sImgurl}" /></a></div>
                        <div><span class="np">￥${item.nPrice}</span><span class="bp">￥${item.bPrice}</span></div>
                        <div class="title"><a href="">${item.title}</a></div>
                        <div class="size">${item.size}</div> 
                        </div></li>`
                }).join('');
                $goodslist.get(0).innerHTML = '';
                $goodslist.html(res);
                if(pageNo>Math.floor(data.total/qty)){
                    pageNo=Math.floor(data.total/qty);
                    $next.css({'color':'#ccc'})
                }
            }
        });
        
    });

    $prev.on('click',function(e){
        e.preventDefault();
        $next.css({'color':'#000'})
        pageNo--;
        console.log(pageNo)
        

        // 重新将请求发送出去
        ajax({
            type:'get',
            url:`http://localhost:3333/api/list.php?pageNo=${pageNo}&qty=${qty}`,
            async:true,
            success:function(data){
                var $goodslist = $('.goodsList');
                var res = data.data.map(function(item){
                    // console.log(item)
                    return `<li><div class="box_over">
                        <div class="bImg"><a href=""><img src="${item.imgurl}" /></a></div>
                        <div class="sImg"><a href=""><img src="${item.sImgurl}" /></a></div>
                        <div><span class="np">￥${item.nPrice}</span><span class="bp">￥${item.bPrice}</span></div>
                        <div class="title"><a href="">${item.title}</a></div>
                        <div class="size">${item.size}</div> 
                        </div></li>`
                }).join('');
                $goodslist.get(0).innerHTML = '';
                $goodslist.html(res);
                if(pageNo<=0){
                    pageNo=1;
                    $prev.css({'color':'#ccc'})

                }
            }
        });
        
    });
           







    // 鼠标移入li高亮显示
    $('.goodsList').on('mouseenter','li',function(e){
        $(this).addClass('gaoliang');
        $(this).find('.size').show();
        $(this).find('.box_over').css({'border':'none'});
    })
    $('.goodsList').on('mouseleave','li',function(e){
        $(this).removeClass('gaoliang');
        $(this).find('.size').hide();
        $(this).find('.box_over').css({'border':'1px solid #ccc'})
    })

})