(function(){
	var windowWidth=$(window).width();
	if (windowWidth<320) {
		windowWidth=320;
	}else if(windowWidth>1300){
		windowWidth=windowWidth*0.6;
	}
	$.get('/ajax/rank', function(d){
		console.log(d);
		var vm=new Vue({
			el:'#app',
			data:{
				items:d.items,
				screen_width:windowWidth
			},
			methods:{
				
			}
		});
		
	}, 'json');

})();