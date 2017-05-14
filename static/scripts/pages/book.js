var id= location.href.split('?id=')[1];
console.log(id);

$.get('/ajax/book?id='+ id, function(d){
	var windowWidth=$(window).width();
	if (windowWidth<320) {
		windowWidth=320;
	}else if(windowWidth>1300){
		windowWidth=windowWidth*0.6;
	}
	console.log(d);
	d.screen_width=windowWidth;
	new Vue({
		
		el:'#app',
		data:d,
		methods:{
			readBook:function(){
				location.href='/reader?id='+id;
			},
			buyBook:function(){
				location.href='/buy?id='+id;
			}
		}
	});
},'json');
