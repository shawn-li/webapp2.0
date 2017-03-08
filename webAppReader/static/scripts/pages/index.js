$.get('/ajax/index',function(d){
	var windowWidth=$(window).width();
	if (windowWidth<320) {
		windowWidth=320;
	}
	new Vue({
		el:'#app',
		data:{
			screen_width:windowWidth,
			double_screen_width:windowWidth*2,
			top:d.items[0].data.data,
			hot:d.items[1].data.data,
			recommend:d.items[2].data.data,
			female:d.items[3].data.data,
			male:d.items[4].data.data,
			free:d.items[5].data.data,
			topic:d.items[6].data.data,
			duration:0.5,
			position:0,
			header_position:0,
			header_duration:0.5,
			tab_1_class:'header-switch_on',
			tab_2_class:''
		},
		methods:{
			tabSwitch:function(pos){
				//this.duration=0.5s;
				//this.header_duration=0.5s;
				if (pos==0) {
					this.position=0;
					this.header_position=0;
					this.tab_1_class='header-switch_on';
					this.tab_2_class='';
				}else{
					this.position= (-windowWidth);
					console.log(this.position);
					this.header_position=277;
					this.tab_1_class='';
					this.tab_2_class='header-switch_on';
				}
			}
		}
	});

},'json');