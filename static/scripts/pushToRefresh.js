(function($){
	
	var target;
	//初始化回调函数传参数
	var params;

	$.fn.pushToRefresh= function( options ){
		var settings = $.extend({} , $.fn.pushToRefresh.defaults , options );
		var el=this;
		var isBox= el.css("overflow");

		while(isBox !='auto' && isBox!='scroll'){
			el=el.parent();
			isDiv =el.css('overflow');
			//检查父元素是不是html，是的话容器就是document，因为html没有高度
			if (el[0].nodeName.toLowerCase() == 'html' ){
				target=$(window);
				el =$(document);
				break;
			}
			if (isDiv == 'scroll')  break;
		}
		console.log("el[0]--"+ el[0]);
		//容器高度
		el.boxHeight = target? target.height():el.height();
		//内容高度
		el.docHeight = target? el.height():el[0].scrollHeight;
		console.log("容器高度:"+el.boxHeight);
		console.log("内容高度:"+el.docHeight);

		//初始化
		el.scroll(function(){
			//console.log(typeof el);
			if (el.workFlag) return;
			if (el.scrollTop()+el.boxHeight < el.docHeight) {
				
			}else{
				//console.log('----'+(el.scrollTop()+el.boxHeight));
				el.workFlag=true;
				el.animateHTML=$(settings.animateHTML);

				if (target) {
					$(document.body).append(el.animateHTML);
				}else{
					console.log('````'+el.animateHTML.height());
					el.append(el.animateHTML);
				}
				params={
					$element:el.animateHTML,
					maxheight:settings.maxheight,
					height:0

				};
				//console.log(el.animateHTML.height());
				el.animateHTML.height(params.height);
				//onInit告诉用户准备好了
				if (settings.onInit) settings.onInit(params);
					el.trigger('onInit',params);
			}
		});
		
		var touch={};
		//当内容小于容器时，主动触发
		el.trigger('scroll');

		el.bind('touchstart',function(e){
			if (!el.workFlag) return;
			if (el.touchFlag)  return;
			el.touchFlag =true;
			//console.log(e.originalEvent.changedTouches);
			touch={
				x:e.originalEvent.changedTouches[0].screenX,
				y:e.originalEvent.changedTouches[0].screenY
			}
			
		});
		//console.log(el.touch.x +"---"+ el.touch.y);
		el.bind('touchmove' , function(e){
				if (!el.workFlag) return;
				var ymovement= e.originalEvent.changedTouches[0].screenY - touch.y;
				if (ymovement >0) return;

				//console.log(el.animateHTML);
				params.height = Math.abs(ymovement);
				
				//回调onDrag
				el.animateHTML.height(params.height);
				// if (settings.onDrag) settings.onDrag(params);
				// el.trigger('onDrag',params);
		});

		// el.bind('scroll',function(e){
		// 	if (!el.workFlag) return;
		// 	console.log( $(window).scrollTop() );
		// 	console.log('内容高度--'+ ($(window).scrollTop()+el.docHeight));
		// 	if ( ($(window).scrollTop()+el.docHeight+5)> $(document).height() ) {
				
		// 		if (settings.onLoading) {
		// 			settings.onLoading(params);
		// 			console.log('加载');
		// 		}
		// 		el.trigger('onLoading',params);
		// 	}
		// 	console.log('内容高度=='+$(document).height());
		// });

		el.bind('touchend' , function(e){
			//debugger
			if (!el.workFlag) return;
			var ymovement= e.originalEvent.changedTouches[0].screenY -touch.y;

			if (ymovement >0) {el.touchFlag=false;return;}

			params.height = Math.abs(ymovement);
			//console.log(params.height );
			//放手时，超出阀值，执行回调函数
			if ( params.height > settings.maxheight) {
				//debugger
				//console.log('****'+params.height );
				if (settings.onLoading) {
					settings.onLoading(params);
					console.log('加载');
				}
				el.trigger('onLoading',params);
			}
			//回缩
			var _h=params.height;
			console.log('拖拽高度--'+_h);
			var _step=parseInt(_h/40) >0? parseInt(_h/40):1;

			var leftTime=function(){
				//回调onDrag

				params.height -=_step;
				el.animateHTML.height(params.height);
				//console.log(params.height);
				// if (settings.onDrag) settings.onDrag(params);
					// el.trigger('onDrag',params);

				if ( _h < settings.maxheight && params.height <1 ){
				
					el.touchFlag=false; 
					clearInterval(_setTime);
					el.animateHTML.height(0);
					//el.animateHTML.remove();
					console.log(el.animateHTML);
					
				}else if ( _h >= settings.maxheight && params.height<settings.maxheight) {
					//console.log('****'+settings.maxheight);
					el.touchFlag=false;
					clearInterval(_setTime);
					el.animateHTML.height(settings.maxheight);

					if ( _h >= settings.maxheight) {
						if (settings.onShrink) settings.onShrink(params);
						el.trigger('onShrink',params);
					}
				}

				// if ((params.height <1 && params.height<settings.maxheight)||
				// 	 (params.height<settings.maxheight && _h>settings.maxheight)
				// 	) {
				// 	el.touchFlag=false;
				// 	clearInterval(_setTime);
				// 	console.log(params.height);
				// 	//弹回后回调
				// 	if (_h > settings.maxheight) {
				// 		if (settings.onShrink) settings.onShrink(params);
				// 		el.trigger('onShrink',params);
				// 	}
				// }
			}
			var _setTime=setInterval(leftTime,5);
			
		});

		el.close=function(){
			el.touchFlag=false;
			el.workFlag=false;
			el.animateHTML.remove();
		}

		return el;
	} 

	$.fn.pushToRefresh.defaults={
		maxheight:200,
		height:0,
		animateHTML:'',
		onInit:function(){console.log('===='+1);},
		onDrag:function(){console.log('===='+2);},
		onLoading:function(){console.log('===='+3);},
		onShrink:function(){console.log('===='+4);}
	}
})(jQuery);