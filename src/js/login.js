jQuery(function($){
// 如下为登录部分login
    // 利用php+mySQL实现注册登录
    var $usernameL = $('.register #username'); 
    var $passwordL = $('.register #password'); 
    var $btnL = $('.register .last button'); 
    var $output = $('.register .last .op'); 
    // 点击登录按钮发送后台请求
    $btnL.on('click',function(e){
        e.preventDefault();
        // 获取输入框中的值
        var useL = $usernameL.get(0).value;
        var passL = $passwordL.get(0).value;
                                

        if(useL != '' && passL != ''){
            ajax({
                type:'get',
                url:`http://localhost:3333/api/login.php?username=${useL}&password=${passL}`,
                async:true,
                success:function(data){  
                    if(data == "ok"){
                        location.href='http://localhost:3333/index.html'; 
                    }else{
                        $output.html('用户名或密码不正确');

                    }             
                    
                }
            })
        }
    })
})