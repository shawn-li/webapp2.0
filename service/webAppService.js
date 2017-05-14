//不直接提供数据，负责后端数据服务
var fs= require('fs');

exports.get_chapter_data=function(){
	var content = fs.readFileSync('./mock/reader/chapter.json','utf-8');
	console.log("--- 获取章节信息");
	return content;
}

exports.get_chapter_content_data=function(id,section){
	var id = id || 1;
	var section=section || 3;
	console.log("section:"+section);
	console.log('./mock/reader/section'+section+'/data'+ id +'.json');
	var content = fs.readFileSync('./mock/reader/section'+section+'/data'+ id +'.json','utf-8');
	return content;
}


exports.get_test_data=function(){
	var content = fs.readFileSync('./mock/test.json','utf-8');
	return content;
}

exports.get_book_data=function(id){
	console.log(id+'--- 在/book页面下js文件发送get请求读取json文件');
	
	if (fs.existsSync('./mock/book/'+id+'.json')) {
		return fs.readFileSync('./mock/book/'+id +'.json','utf-8');
	}else{
		console.log('--');
		return fs.readFileSync('./mock/book/321145.json','utf-8');
		//把mock数据看作是id=321145的数据
	}
	
}
exports.get_female_data=function(){
	var content = fs.readFileSync('./mock/female.json','utf-8');
	return content;
}
exports.get_male_data=function(){
	var content = fs.readFileSync('./mock/male.json','utf-8');
	return content;
}
exports.get_index_data=function(){
	var content = fs.readFileSync('./mock/home.json','utf-8');
	return content;
}

exports.get_rank_data=function(){
	var content = fs.readFileSync('./mock/rank.json','utf-8');
	return content;
}

exports.get_category_data=function(){
	var content = fs.readFileSync('./mock/category.json','utf-8');
	return content;
}

exports.get_bookbacket_data=function(){
	var content = fs.readFileSync('./mock/bookbacket.json','utf-8');
	return content;
}

exports.get_search_data=function(start, end, keyword){
	return function(cb){
		var http=require('http');
		var qs=require('querystring');
		var data={
			s: keyword,
			start : start,
			end: end
		};
		var content=qs.stringify(data);
		var http_request={
			hostname: 'dushu.xiaomi.com',
			port: 80 ,
			path: '/store/v0/lib/query/onebox?'+content
		}
		req_obj = http.request(http_request, function(response){
			var callback_content='';
			response.setEncoding('utf8');
			response.on('data',function(chunk){
				callback_content += chunk;
			});
			response.on('end',function(){
				cb(null, callback_content);
			});
		});
		req_obj.on('error', function(e){
			console.log('error:' + e);
		});
		req_obj.end();
	}
}