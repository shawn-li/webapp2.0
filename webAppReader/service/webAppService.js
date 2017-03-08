//不直接提供数据，负责后端数据服务
var fs= require('fs');

exports.get_chapter_data=function(){
	var content = fs.readFileSync('./mock/reader/chapter.json','utf-8');
	return content;
}

exports.get_chapter_content_data=function(id){
	var id = id || 1;
	var content = fs.readFileSync('./mock/reader/data/data'+ id +'.json','utf-8');
	return content;
}


exports.get_test_data=function(){
	var content = fs.readFileSync('./mock/test.json','utf-8');
	return content;
}

exports.get_book_data=function(id){
	var id = id || 18218;
	console.log(id);
	if (fs.existsSync('./mock/book/'+id+'.json')) {
		return fs.readFileSync('./mock/book/'+id +'.json','utf-8');
	}else{
		return fs.readFileSync('./mock/book/18218.json','utf-8');
		console.log('a');
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