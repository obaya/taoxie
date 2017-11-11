function ajax(options){

    // 默认参数
    var defaults = {
        // 请求类型
        type:'get',

        // 是否异步
        async:true,

        // 回掉函数
        // success:function(){}

        // jsonp请求默认参数名
        jsonpName:'callback'
    }

    // 扩展参数
    // var opt = Object.assign({},defaults,options);
    for(var attr in options){
        defaults[attr] = options[attr];
    }
    var opt = defaults;

    // type参数忽略大小写
    opt.type = opt.type.toLowerCase();

    // 参数处理
    // opt.data=>{}
    // params = 'page=1&title=xxx'
    var params = '';
    if(opt.data){
        for(var attr in opt.data){
            params += attr + '=' + opt.data[attr] + '&';
        }

        // 去除多余的&
        params = params.slice(0,-1);
    }

    // jsonp请求
    if(opt.type === 'jsonp'){
        // 随机回掉函数名，防止多个请求时被覆盖
        // var callbackName = 'getData' + Math.floor(Math.random()*10000);
        var callbackName = 'getData' + Date.now();

        // 1.定义全局函数
        window[callbackName] = function(res){
            try{
                res = JSON.parse(res);
            }catch(err){

            }

             // 数据传递到回掉函数success
            if(typeof opt.success === 'function'){
                opt.success(res);
            }

            // 删除生成的script标签
            script.parentNode.removeChild(script);
        }

        // 2.创建script标签，并写入页面
        var script = document.createElement('script');

        // 判断url中是否已经存在?号（get请求和jsonp需要判断）
        opt.url += opt.url.indexOf('?')>=0 ? '&' : '?';

        script.src = opt.url + params + '&' + opt.jsonpName + '='+callbackName;
        document.body.appendChild(script);

        // jsonp请求结束，终止代码向下执行
        return;
    }


    // 创建异步请求对象
    var xhr = null;
    try{
        // 标准浏览器
        xhr = new XMLHttpRequest();
    }catch(error){
        // IE浏览
        try{
            xhr = new ActiveXObject("Msxml2.XMLHTTP");
        }catch(err){
            try{
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }catch(e){
                alert('你的浏览器太low了，赶紧换吧');
                return;
            }
        }
    }

    // 处理数据
    var status = [200,304,201,300];
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4 && status.indexOf(xhr.status) >= 0){
            var res = xhr.responseText;//string,json=>string,object,array
            try{
                // 标准浏览器
                res = JSON.parse(res);
            }catch(err){
                try{
                    // 如果浏览器不支持JSON.parse
                    res = eval('('+ res + ')'); 
                }catch(e){
                    res = xhr.responseText;
                }
            }

            // 数据传递到回掉函数success
            if(typeof opt.success === 'function'){
                opt.success(res);
            }
        }
    }

    if(opt.type === 'get'){
        // 判断url中是否已经存在?号（get请求和jsonp需要判断）
        // football.php?id=1&pageNo=1&qty=10
        opt.url += opt.url.indexOf('?')>=0 ? '&' : '?';

        opt.url += params;
        
        // 避免get请求中往send方法传参
        params = null;
    }

    // 建立与服务器的连接
    xhr.open(opt.type,opt.url,opt.async);

    // 如果为post，则添加content-type请求头
    if(opt.type === 'post'){
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    }

    // 发送请求
    xhr.send(params);
}
ajax.jsonp = function(options){
    options.type = 'jsonp';
    this(options);
}
ajax.post = function(options){
    options.type = 'post';
    this(options);
}
ajax.get = function(options){
    options.type = 'get';
    this(options);
}


// ajax({
//     type:'jsonp',
//     url:'http://localhost:1706/api/football.php',
//     data:{pageNo:1,qty:10},
//     //async:true,
//     success:function(data){
//         //处理数据
//         data.map(function(){

//         });
//     }
// });
// ajax({
//     type:'jsonp',
//     url:'http://localhost:1706/api/baid_suggest.php',
//     data:{pageNo:1,qty:10},
//     //async:true,
//     success:function(data){
//         //处理数据
//         data.map(function(){

//         });
//     }
// });

// ajax.get({
//     type:'jsonp',
//     url:'http://localhost:1706/api/baid_suggest.php',
//     data:{pageNo:1,qty:10},
//     //async:true,
//     success:function(data){
//         //处理数据
//         data.map(function(){

//         });
//     }
// })
