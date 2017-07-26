(function(){
	var curNum=0;
	var target;

	$.fn.lxslider=function(options){
		var settings= $.extend({}, $.fn.lxslider.defaults , options);
		var el =this;
		//el.find('.cover').css('border','1px red solid');
		target=el.find('.cover').parent();
		
		console.log(target[0]);
		console.log("---" + target.length);

		settings.pre_button.click(function(){
			settings.pre();
		});
		settings.next_button.click(function(){
			settings.next();
		});

	};
	$.fn.lxslider.defaults={
		animateTime:500,
		pre_button:$('.cover_pre'),
		next_button:$('.cover_next'),
		pre:function(){
			console.log(curNum);
			if (curNum >0 ) {
				curNum--;
				console.log("上一页:"+curNum);	
				
			}else if (curNum == 0) {
				curNum=target.length-1;
				target.each(function(index,element){	
				$(this).css('display',"none");
				});
				$(target[curNum]).css('display','block');
			}
			
				
		},
		next:function(){
			console.log(curNum);
			if (curNum < target.length-1 ) {
				curNum++;
				console.log("下一页:"+curNum);
				console.log(target[curNum]);
				
			}else if(curNum == target.length-1){
				curNum = 0;
			}
			target.each(function(index,element){
				$(this).css('display',"none");
			});
			$(target[curNum]).css('display','block');
			return;
		}
		// pre:$('.cover_pre'),
		// next:$('.cover_next')
	}
})();