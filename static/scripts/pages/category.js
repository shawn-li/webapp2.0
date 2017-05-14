(function(){
	var windowWidth=$(window).width();
	if (windowWidth<320) {
		windowWidth=320;
	}else if(windowWidth>1300){
		windowWidth=windowWidth*0.6;
	}
	$.get('/ajax/category', function(d){
		console.log(d);
		var data={
				section:d.section,
				key:d.section.key,
				book:d.book,
				magazine:d.magazine,
				male:d.male,
				female:d.female,
				screen_width:windowWidth,
				quadruple_screen_width:windowWidth*4,
				duration:0.5,
				position:0,
				active_class:'',
				header_position:(windowWidth/4-54)/2,
				header_position_1:(windowWidth/4-54)/2,
				header_position_2:(windowWidth/4-54)/2+(windowWidth/4),
				header_position_3:(windowWidth/4-54)/2+(windowWidth/4)*2,
				header_position_4:(windowWidth/4-54)/2+(windowWidth/4)*3
			}
		var vm=new Vue({
			el:'#app',
			data:data,
			methods:{
				exit:function(){
					location.href= '/';
				},
				tabSwitch:function(e){
					console.log(e.target);
					changeNum();
					var type= $(e.target).attr('data-type');
					switch(type){
						case 'book':
							this.position= 0;
							this.header_position=this.header_position_1;
							$('.channel-list').removeClass('active_class');
							$('.new').remove();
							$('#channel_book').addClass('active_class');
							break;
						case 'magazine':
							this.position= (-windowWidth);
							this.header_position=this.header_position_2;
							$('.channel-list').removeClass('active_class');
							$('.new').remove();
							$('#channel_magazine').addClass('active_class');
							break;
						case 'male':
							this.position= (-windowWidth*2);
							this.header_position=this.header_position_3;
							$('.channel-list').removeClass('active_class');
							$('.new').remove();
							$('#channel_male').addClass('active_class');
							break;
						case 'female':
							this.position= (-windowWidth*3);
							this.header_position=this.header_position_4;
							$('.channel-list').removeClass('active_class');
							$('.new').remove();
							$('#channel_female').addClass('active_class');
							break;
					}

					//$('ul.active_class').css('backgroundColor','#666');
					//console.log(this.header_position);
					//console.log(type);
				}
			
			}
		});
	}, 'json');

})();