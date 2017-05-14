(function(){
	var windowWidth=$(window).width();
	if (windowWidth<320) {
		windowWidth=320;
	}else if(windowWidth>1300){
		windowWidth=windowWidth*0.6;
	}
	$.get('/ajax/index', function(d){
		console.log(d.items[4].data.data);
		new Vue({
			el:'#app',
			data:{
				male:d.items[4].data.data,
				screen_width:windowWidth
			},
			methods:{
				exit:function(){
					location.href= '/';
				}
			}
		});
	}, 'json');
})();