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
    var $goodslist = $('.goodsList');
    ajax({
        type:'get',
        url:`http://localhost:3333/api/list.php?pageNo=${pageNo}&qty=${qty}`,
        async:true,
        success:function(data){
            var res = data.data.map(function(item){
                // console.log(item)
                return `<li data-id="${item.id}"><div class="box_over">
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
                var res = data.data.map(function(item){
                    // console.log(item)
                    return `<li data-id="${item.id}"><div class="box_over">
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
                var res = data.data.map(function(item){
                    // console.log(item)
                    return `<li data-id="${item.id}"><div class="box_over">
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

    // 点击li时通过data-id获取到当前li对应的数据库中的id
    $goodslist.on('click','li',function(e){
        e.preventDefault();
        var goodsId = $(this).attr('data-id');
        // 将id传给goods.php
        ajax({
            type:'get',
            url:`http://localhost:3333/api/goods.php?id=${goodsId}`,
            async:true,
            success:function(data){
                console.log(data)
                // data为每一个商品的详细信息
                // 使用location.href将商品信息传递出去
                // 将data转为url形式
                var params = "?";
                // 遍历对象
                for(var attr in data){
                    console.log(attr)
                    params += attr + '=' + encodeURI(data[attr])+'&';
                }
                // 去掉多余的&
                params=params.slice(0,-1);
                
                location.href='goods.html'+ params;      
                
            }
        });
        
    })
           







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




    // 将tab.json文件中的数据请求至页面
    ajax({
        type:'get',
        url:'http://localhost:3333/api/data/tab.json',
        async:true,
        success:function(data){
            var tab1 = data.slice(0,2);
            // 遍历tab1 写入ul.tab1
            var $Tab1 = $('.sale_right .tab1');
            $Tab1.get(0).innerHTML = tab1.map(function(i1){
                return `<li>
                <div class="title">活动结束了</div>
                <div><img src="../${i1.imgurl}" ></div>
                <div class="name">${i1.name}</div>
                <div class="price">抢购价：${i1.price}</div>
                </li>`
            }).join('');

            

        }
    });

})