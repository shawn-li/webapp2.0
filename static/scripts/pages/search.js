(function(){
	var windowWidth=$(window).width();
	if (windowWidth<320) {
		windowWidth=320;
	}else if(windowWidth>1300){
		windowWidth=windowWidth*0.6;
	}
	new Vue({
	el: '#app',
	data: {
		search:[],
		prompt:[],
		condition:false,  //搜索情况,默认为未完成
		empty:false,     //搜索结果,默认为非空
		search_done:false,   //提示情况,默认为未完成
		screen_width:windowWidth
	}, 
	methods: {
		doSearch: function(e) {
			var keyword = $('#search_box').val();
			var _this = this;
			$.get('/ajax/search',{
				keyword:keyword
			},function(d){ 
				console.log(d.items);
				_this.condition = true;
				_this.search = d.items;
				if(_this.search.length == 0){
					_this.empty = true;
				}else{
					_this.empty = false;
				}
				_this.search_done=true;
				console.log('搜索完成:'+_this.search_done);
			},'json')
		},
		getKey:function(e){
			var keyword=$('#search_box').val();
			var _this=this;
			_this.condition=false;
			$('#search_prompt').css('display','block');
			$.get('/ajax/search',{
				keyword:keyword
			},function(d){
				_this.prompt = d.items;
				_this.search_done=false;
				if (_this.prompt.length==0) {
					_this.empty = true;
				}else{
					_this.empty = false;
				}
				console.log('搜索keyword:'+keyword);
				console.log('搜索结果:'+d.items);
			},'json');
			
		},
		clickPrompt:function(e){
			var text=$(e.target).text().trim();
			$('#search_box').val(text);
			var _this=this;
			_this.search_done=true;
			$.get('/ajax/search',{keyword:text},function(d){
				console.log(d.items);
				_this.condition = true;
				_this.search = d.items;
				if(_this.search.length == 0){
					_this.empty = true;
				}else{
					_this.empty = false;
				}
				_this.search_done=true;
				console.log('搜索完成:'+_this.search_done);
				console.log('id:'+d.items.id);
			},'json');
		}
	}
});

})();