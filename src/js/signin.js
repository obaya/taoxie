jQuery(function($){
// 如下为注册部分
    // 设置随机验证码
    // 页面加载获取随机四位验证码，点击“换个验证码”再次获取随机验证码，若没有填失去焦点时提示此项为必填项
    var $yzm = $('.yzm #yzm');//输入验证码的框框
    var $getYZM = $('.yzm .getYZM');//获取验证码的框框
    var $rgetYZM = $('.yzm  span a');//换个验证码的框框
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
        }else{
            $tishi.html('√').css('color','red')
        }

    })
    // 点击$rgetYZM时，换个验证码
    $rgetYZM.on('click',function(){
        yanzhengma();
    })
    
    
    
    
    // 给登录名，密码，确认密码框设置条件
    
    
    
    

    //登录名的输入框
    var $usernameS = $('.signin #username');
    var $output1 =  $usernameS.next();
    // 登录名框失去焦点时
    $usernameS.on('blur',function(){
        var _username = $usernameS.get(0).value;
        // 登录名
        if(!/^[0-9a-z]{3,}$/.test(_username)){
            console.log(999)
            $output1.html("用户名不合理").css('color','red');
            $usernameS.get(0).value="";
            $usernameS.get(0).focus();
        }else{
            // 向mysql请求数据该用户名的使用情况
            ajax({
                type:'get',
                url:`http://localhost:3333/api/reg.php?username=${_username}`,
                async:true,
                success:function(data){              
                    if(data=='fail'){
                        $output1.html("此名已被占用").css('color','red');
                        $usernameS.get(0).focus();
                    }else{
                        $output1.html("√").css('color','red');
                    }
                }
            })
            
        }
    })

    //设置密码的输入框
    var $passwordS = $('.signin #password'); 
    var $output2 =  $passwordS.next();

    // 密码框失去焦点时
    $passwordS.on('blur',function(){
        var _password = $passwordS.get(0).value;
        if($passwordS.get(0).value != ''){
            if(!/^[0-9a-zA-Z]{6,20}$/.test(_password)){
                $output2.html("密码不合理").css('color','red');
                $passwordS.get(0).value="";
                $passwordS.get(0).focus();
            }else{
                $output2.html("√").css('color','red');

            }
            
        }
    })

    //确认密码的输入框
    var $passwordSS = $('.signin #password2'); 

    var $output3 =  $passwordSS.next();
    // 确认密码框失去焦点时
    $passwordSS.on('blur',function(){
        var _passwords = $passwordSS.get(0).value;
        var _password = $passwordS.get(0).value;
        if($passwordSS.get(0).value != ''){
            if(_passwords != _password){
                $output3.html("密码不正确").css('color','red');
            }else{
                $output3.html("√").css('color','red');

            }
            
        }
    })
        
    


    // 点击注册时在此请求
    $('.signin .last').on('click',function(){
        // 若每个output中的内容都是√,向后台请求将用户名密码保存
        console.log($output1.html(),$output2.html(),$output3.html())
        if(($output1.html() == "√") && ($output2.html() == "√") && ($output3.html() == "√")){
                var _password = $passwordS.get(0).value;
                var _username = $usernameS.get(0).value;
                ajax({
                    type:'get',
                    url:`http://localhost:3333/api/reg.php?username=${_username}&password=${_password}`,
                    async:true,
                    success:function(data){  

                        
                    }
                })
                alert('注册成功') 
        }
    })

    

});











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
         
        // 如下为使用封装好的ajax插件
        // 向自设的signin.php请求数据
        // ajax({
        //     type:'get',
        //     url:'http://localhost:3333/api/signin.php?username='+_username,
        //     async:true,
        //     success:function(data){               
        //         if(data=='yes'){
        //             $output.html("√").css('color','red');
        //         }else if(data=='no'){
        //             $output.html("此名已被占用").css('color','red');
        //         }
        //     }
        // })