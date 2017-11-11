jQuery(function($){
// 如下为注册部分
    // 设置随机验证码
    // 页面加载获取随机四位验证码，点击“换个验证码”再次获取随机验证码，若没有填失去焦点时提示此项为必填项
    var $yzm = $('.yzm #yzm');//输入验证码的框框
    var $getYZM = $('.yzm .getYZM');//获取验证码的框框
    var $rgetYZM = $('.yzm .getYZM span a');//换个验证码的框框
    var $tishi = $('.yzm div');//提示框
    
    function yanzhengma(){
        var _yzm=$yzm.get(0).value;
        var randomNumber=parseInt(Math.random()*10000);
        // 给验证码补零
        if(randomNumber<10){
            randomNumber='000'+randomNumber;
        }else if(randomNumber<100){
            randomNumber='00'+randomNumber;
        }
        else if(randomNumber<1000){
            randomNumber='0'+randomNumber;
        }
        $getYZM.html(randomNumber);        
    }
    yanzhengma();
    //输入框为空或者验证码不正确又失去焦点时，提示
    $yzm.on('blur',function(){
        var _yzm=$yzm.get(0).value;
        if(_yzm !== $getYZM.get(0).innerHTML){
            $tishi.html('请输入正确的验证码').css('color','red')
            yanzhengma();
        }

    })
    // 点击$rgetYZM时，换个验证码
    $rgetYZM.on('click',function(){
        yanzhengma();
    })
    


    // 验证用户名是否被占用（用到ajax向php请求）
    var $usernameS = $('.signin #username'); //登录名的输入框
    var $output =  $usernameS.next();

    // 输入框失去焦点时
    $usernameS.on('blur',function(){
        var _username = $usernameS.get(0).value;
        // // 发送请求,
        // var xhr = new XMLHttpRequest();

        // // 处理服务器返回的数据
        // xhr.onreadystatechange = function(){
        //     if(xhr.readyState === 4){
        //         var res = xhr.responseText;
        //         if(res=='yes'){
        //             $output.html("√").css('color','red');
        //         }else if(res=='no'){
        //             $output.html("此名已被占用").css('color','red');
        //         }
        //     }
        // }
        // // 设置请求参数
        // xhr.open('get','http://localhost:3333/api/signin.php?username='+_username,true);

        // // 发送
        // xhr.send();
         
        // 如何为使用封装好的ajax插件
        ajax({
            type:'get',
            url:'http://localhost:3333/api/signin.php?username='+_username,
            async:true,
            success:function(data){               
                if(data=='yes'){
                    $output.html("√").css('color','red');
                }else if(data=='no'){
                    $output.html("此名已被占用").css('color','red');
                }
            }
        })
    })



// 如下为登录部分register
// 利用php+mySQL实现注册登录

});