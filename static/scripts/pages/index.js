(function(){

	var windowWidth=$(window).width();
		if (windowWidth<320) {
			windowWidth=320;
		}else if(windowWidth>1300){
			windowWidth=windowWidth*0.6;
		}
		var windowHeight=$(window).height();
		console.log(windowHeight);

	//下划线初始书城位置
	 var header_position_start=((windowWidth-180)/4)-(30/2);
	 //下划线在书架的位置
	 var header_position_end =header_position_start+(windowWidth-180)/2;
	 //console.log(header_position_end);
	 console.log(header_position_start+'---'+header_position_end);

	$.get('/ajax/index',function(d){
		
		console.log(d);
		// var offset = $($('.Switch-tab').find('a')[0]).offset();
		// console.log(offset);
		//var index_header_tab_width = offset.width;
		
		new Vue({
			el:'#app',
			data:{
				screen_width:windowWidth,
				screen_height:windowHeight,
				double_screen_width:windowWidth*2,
				index_header_tab_width:28,
				top:d.items[0].data.data,
				hot:d.items[1].data.data,
				recommend:d.items[2].data.data,
				female:d.items[3].data.data,
				male:d.items[4].data.data,
				free:d.items[5].data.data,
				topic:d.items[6].data.data,
				duration:0.5,
				position:0,
				header_position:header_position_start,
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
						this.header_position=header_position_start;
						this.tab_1_class='header-switch_on';
						this.tab_2_class='';
					}else if(pos==1 ){
						this.position= (-windowWidth);
						//console.log(this.position);
						this.header_position=header_position_end;
						this.tab_1_class='';
						this.tab_2_class='header-switch_on';
					}
					console.log(this.header_position);
				}
			}
		});
		
	},'json');

	$('.js-tab-2').click(function(){
		$('.container-shelf').css('display','block');
	});

	var touchstart,touchend;
	$('.container-wrap').bind('touchstart', function(e){
		touchstart=e.changedTouches[0].clientX;
	});
	$('.container-wrap').bind('touchend',function(e){
		touchend=e.changedTouches[0].clientX;
		if (touchend - touchstart < (-50)) {
			console.log(1);
			// $(window).animate({
			// 	tanslate3d:(-windowWidth)+'px,0px,0px'
			// },500);
			// console.log(windowWidth);
			$('.js-tab-1').removeClass('header-switch_on');
			$('.js-tab-2').addClass('header-switch_on');
			$('.container-shelf').css('display','block');
			$('.js-transform').css('-webkit-transform','translateX('+(-windowWidth)+'px)');
			$('.js-header-tab').css('-webkit-transform','translateX('+header_position_end+'px)');
		}
	});

	$('.container-shelf').bind('touchstart', function(e){
		touchstart=e.changedTouches[0].clientX;
	});
	$('.container-shelf').bind('touchend',function(e){
		touchend=e.changedTouches[0].clientX;
		if (touchend - touchstart > 50) {
			// $(window).animate({
			// 	tanslate3d:'0px,0px,0px'
			// },500);
			$('.js-tab-1').addClass('header-switch_on');
			$('.js-tab-2').removeClass('header-switch_on');
			$('.js-transform').css('-webkit-transform','translateX(0px)');
			$('.js-header-tab').css('-webkit-transform','translateX('+header_position_start+'px)');
			console.log(2);
		}
	});
	$('.header-user').click(function(e){
		location.href='/admin';
	});

	$('.top-preview').lxslider();
	
})();
