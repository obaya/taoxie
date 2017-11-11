/**
 * [获取一个范围内的随机整数]
 * @param  {Number} min [最小值]
 * @param  {Number} max [最大值]
 * @return {Number}     [返回一个随机整数]
 */
function randomNumber(min,max){
	return parseInt(Math.random()*(max-min+1)) + min;
}

//randomNumber(100,200);

/**
 * [随机颜色]
 * @return {String} [返回rgb格式颜色]
 */
function randomColor(){
	// 得到rgb随机颜色
	var r = parseInt(Math.random()*256);
	var g = parseInt(Math.random()*256);
	var b = parseInt(Math.random()*256);

	return 'rgb(' + r + ',' + g + ',' + b + ')';
}

// 封装获取元素样式兼容性
function getStyle(ele,attr){
    var res='';
    if(window.getComputedStyle){
        res=getComputedStyle(ele)[arrt];
    }else if(ele.currentStyle){
        res=ele.currentStyle[arrt];
    }else{
        res=ele.style[arrt];
    }
    return res;
}
// getStyle(box,'color')



// 封装函数兼容事件监听器
function bind(ele,type,handler,capture){
    if(ele.addEventListener){//高版本
        ele.addEventListener(type,handler,capture);
    }else if(ele.attachEvent){
        ele.attachEvent('on'+type,handler);
    }else{
        ele['on'+type] = handler;
    }
}
// blid(btn,'click',function(),true)


// 封装cookie的增删查改函数
// 用一个含函数（方法）的对象封装
var obj = {
    set:function(name,value,date,path){
        // cookie,是一个字符串
        var str = name+'='+value;
        // 如果有expires，就加上
        if(date){
            str+=';expires='+date.toUTCString();
        }
        // 如果有path，就加上
        if(path){
            str+=';path='+'='+path;
        }
        // 写入cookie
       document.cookie = str;
    },
     remove:function(name,path){
        // 先声明当前时间
        var now = new Date();
        now.setDate(now.getDate()-7);
        // 直接调用上面设置好的cookie
        this.set(name,'null',now,path);
     },
     get:function(name){
        var res ='';
        // 先获取能访问的所有cookie
        var cookies = document.cookie;
        // 如果cookie里没有东西，就是空的
        if(!cookies.length){
            return res;
        }
        // 先将cookies转为数组
        cookies = cookies.split('; ');
        // 遍历cookies,兼容ie只能用for循环遍历
        for(var i=0;i<cookies.length;i++){
            var arr = cookies[i].split('=');
            if(arr[0] == name){
                res = arr[1];
                break;
            }
        }
        return res;
     }
}
// cookie.set(name,value,date,path)
// cookie.remove(name,//时间只要在当前时间基础上减去就行了，path)
// cookie.get(name)
// <[\da-z]+ [^>]+>



 
// 封装动画函数
// function animate(ele,attr,target){
//     // 把定时器作为DOM节点的属性
//     clearInterval(ele.timer);
//     ele.timer = setInterval(function(){
//         // 获取当前值
//         var current = getComputedStyle(ele)[attr];

//         // 提取单位
//         var unit = current.match(/\d([a-z]*)$/);//后面这个分组是单位；
//         // 判断是否有单位,有的话单位就是分组里的内容，没有就是空
//         unit = unit?unit[1]:'';

//         // 提取数字
//         current = parseFloat(current);

//         // 设置变化的速度
//         var speed = (target - current)/10;
//         // 判断速度的正负
         
//         // 透明度为小数点，需要额外判断
//         if(attr === 'opacity'){
//             speed = speed>0?0.05 : -0.05;
//         }else {
//             speed = speed>0?Math.ceil(speed) : Math.floor(speed);
//         }


//         // 停止计时器
//         if(current===target){
//             clearInterval(ele.timer);
//             current = target - speed;
//         }
//         ele.style[attr] = current + speed + unit;
//     },30);

// }
// animate(box,'top',-320)
// 


 
// 封装 <支持多属性同时运动，支持回调函数>
function animate(ele,opt,callback){
    var timerQty = 0;
    // 遍历对象
    for(var attr in opt){
        // 记录属性个数即动画次数
        timerQty++;
        // 在这里执行封装的动画函数
        createTimer(attr);//将属性值传入函数，使其能够调用
    }    
    function createTimer(attr){
        // 以属性名创建定时器名字
        var timeName = attr + 'timer';

        // 每次清除前一次的定时器，防止多个定时器作用于同一元素
        clearInterval(ele[timeName]);

        // 目标值
        var target = opt[attr];

        // 设置定时器
        ele[timeName] = setInterval(function(){
            var current = getComputedStyle(ele)[attr];//当前值
            //提取单位
            var unit = current.match(/\d([a-z]*)$/);//后面这个分组里的内容就是单位
            // 判断，若有单位就提取，没有就为空
            unit = unit ? unit[1] : '';

            // 提取数字(因为current是所有属性的可能)
            current = parseFloat(current);

            var speed = (target-current)/10;

            // 判断透明属性
            if(attr == 'opacity'){
                speed = speed >0? 0.05:-0.05;
            }else{
                speed = speed >0? Math.ceil(speed) : Math.floor(speed);
            }

            // 清除定时器
            if(current == target){
                clearInterval(ele[timeName]);
                current = target - speed;

                // 达到一次目标动画次数就减少一次
                timerQty--;
                // 判断当动画次数等于0 并且后面有链式动画时要再执行回调函数
                if(typeof callback == 'function' && timerQty == 0){
                    callback();
                }
            }
            ele.style[attr] = current + speed + unit;   
            
        },30);
    }

}
// animate(box,{width:200,top:20})


 
// 封装工具包
var Tool = {
    // 判断所有数据类型
    typeof:function(data){
        //return Object.prototype.toString.call(123)//---'[object Number]'
        return Object.prototype.toString.call(data).slice(8,-1).toLowerCase();//相当于data.toString()
    }

}

// 调用
// Tool.typeof('123')
// Tool.typeof(123)