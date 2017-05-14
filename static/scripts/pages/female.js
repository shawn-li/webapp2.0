(function(){
	var windowWidth=$(window).width();
	if (windowWidth<320) {
		windowWidth=320;
	}else if(windowWidth>1300){
		windowWidth=windowWidth*0.6;
	}
	$.get('/ajax/index', function(d){
		console.log(d.items[3].data.data);
		new Vue({
			el:'#app',
			data:{
				screen_width:windowWidth,
				female:d.items[3].data.data
			},
			methods:{
				exit:function(){
					location.href= '/';
				}
			}
		});
	}, 'json');
})();