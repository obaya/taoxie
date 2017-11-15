// 轮播图插件
// 最终格式: ;(function($){$.fn.插件名=function(){}})(jQuery);
;(function($){
	// 扩展原生对象的方法
	// jQuery.prototype.lxCarousel = function(options){
	$.fn.lxCarousel = function(options){
		// 默认属性
		var defaults = {
            width:810,
            height:320,
            // 图片
            img:[],
            // 元素
            ele:'.carousel',
            // 图片切换间隔时间
            duration:3000,
            // 滚动类型
            type:'horizontal',//可能水平或者淡入淡出
            // 设置默认索引值
            index:0,
            // 是否自动轮播
            autoPlay:true,
            // 是否显示按钮
            showBtn:true,
            // 是否显示翻页
            showPage:true,
        };

		// 覆盖默认参数
		var opt = jQuery.extend({},defaults,options);//用后面的对象扩展前面的对象

		// 原来这些方法都写在原型对象中，但是现在本身就是写在jQuery的原型对象中，所以可以直接将这些方法提取出来
		// Carousel.prototype = {
		// 	init(){},
		// 	move(){},
		// }
		
		var self = this;//self就是调用这个方法的实例，即box
		var Car = {
			// 设置方法
            // 初始化
            init(opt){
                
                // 给这个节点添加类名，才能实现我们设的样式
                // 这里的this是Car
                //this.ele = self;//this.ele是实例box

                self.addClass('carousel');

                // 创建ul
                var ul = document.createElement('ul');
                // 将图片写入
                ul.innerHTML = opt.img.map(function(item){
                    return `<li><img src = "${item}"></li>`
                }).join('');

                // 复制第一张，并写入最后
                var newimg = ul.children[0].cloneNode(true);
                ul.appendChild(newimg);

                
                // 将ul写入页面
                self.append(ul);


                // 图片的总张数
                var length = ul.children.length;
                // 图片的宽度
                var imgWidth = ul.children[0].offsetWidth;
                // ul的宽度
                ul.style.width = imgWidth*length + 'px';


                // 将ul传递出去
                this.ul = ul;

                // 将opt传出去
                this.opt = opt;

                // 将opt的index传出去
                this.index = opt.index;
                this.len = length;


                // 如果设置自动轮播，就开始轮播
                if(opt.autoPlay){
                    this.start();

                    // 鼠标移入停止
                    self.on('mouseenter',function(){
                    	this.stop();
                    }.bind(this));
                    
                    self.on('mouseleave',function(){
                    	this.start();
                    }.bind(this));
                }

                // 如果添加左右按钮
                if(opt.showBtn){
                    // 创建两个按钮
                    var next = document.createElement('span');
                    var prev = document.createElement('span');
                    // 给按钮添加名字，以便设置样式
                    next.className = 'next';
                    prev.className = 'prev';
                    // 写入箭头
                    next.innerHTML = '&gt;';
                    prev.innerHTML = '&lt;';
                    // 将按钮写入页面
                    self.append(next);
                    self.append(prev);
                    
                }


                // 如果添加分页
                if(opt.showPage){
                    

                    // 创建分页
                    var page = document.createElement('div');
                    page.className = 'page';
                    for(var i=0;i<this.len-1;i++){
                        var span = document.createElement('span');
                        span.innerText = i+1;
                        
                        // 当前页显示高亮
                        if(i === this.index){
                            span.className = 'active';
                        }
                        page.appendChild(span); 
                           
                          
                    }
                        self.append(page);
                    this.page = page;  
                    this.active(page);      

                
                }
                // 点击时实现翻页
                self.on('click', function(e){

                    if(e.target.className == 'next'){
                        this.next();
                        clearInterval(self.timer);
                    }else if(e.target.className == 'prev'){
                        this.prev();
                    
                    }else if(e.target.parentNode.className == 'page'){
                        this.index = e.target.innerText-1;
                        this.active();
                        this.move();
                    }

                }.bind(this));
                // 
                 
            },


            move(){

                if(this.index>=this.len){
                    this.ul.style.left = 0;
                    this.index = 1;
                  
                }else if(this.index<0){
                    this.index = this.len-2;
                }
                var target = {};
                if(this.opt.type === 'vertical'){
                    target.top = -this.index*this.opt.height;
                }else if(this.opt.type === 'horizontal'){
                    target.left = -this.index*this.opt.width;
                }
                
                self.children('ul').animate(target);
 
            },

            // 控制高亮
            active(page){
                // this.next()
                for(var i=0;i<this.len-1;i++){
                    this.page.children[i].className = '';
                }   
                if(this.index == this.len-1){
                    this.page.children[0].className = 'gaoliang';
                }else{
                    this.page.children[this.index].className = 'gaoliang';      
                }                   
            },
                
           // 控制轮播
            start(){
                var self = this;
                self.timer = setInterval(function(){
                    self.index++;
                    self.move();
                    self.active();
                },self.opt.duration);
            },
            stop(){
                clearInterval(this.timer);
            },

            // 仅供点击按钮的时候用
            next(){
                this.index++;
                this.move();
                this.active();
            },
            prev(){
                this.index--;
                this.move();
                this.active();
            }
                           
		};
		Car.init(opt);

	}
})(jQuery);