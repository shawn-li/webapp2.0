
(function(){
	var id= location.href.split('?id=')[1];
	console.log(id);

	$.get('/ajax/book?id='+ id, function(data){
		console.log(data);
		var windowWidth=$(window).width();
		if (windowWidth<320) {
			windowWidth=320;
		}else if(windowWidth>1300){
			windowWidth=windowWidth*0.6;
		}
		data.screen_width=windowWidth;

		new Vue({
			el:'#app',
			data:data,
			methods:{
				exitbuy:function(){
					location.href= '/book?id='+id;
				}
			
			}
		});
		//console.log(price);
	}, 'json');
})();