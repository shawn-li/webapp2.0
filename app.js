var koa = require('koa');
var controller = require('koa-route'); //注册中间件设置路由
var mongoose = require('mongoose');
var _ = require('underscore');

var app = koa();
var views= require('co-views');  //中间件用来渲染模板的库
var render=views('./view/',{
	map:{ html:'ejs' }
 }); 

var koa_static=require('koa-static-server');  //访问静态资源文件 
var service= require('./service/webAppService.js');
var qs=require('querystring');

app.use(koa_static({
	rootDir:'./static/',
	rootPath:'/static/',
	maxage:0
}));

//mongoose.connect('mongodb://localhost/lx');


app.use(controller.get('/route_test',function *(){  //get 方法 访问根目录下的任何一个文件
	this.set('Cache-Control','no-cache');
	this.body='hello koa';
}));

app.use(controller.get('/ejs_test',function *(){
	this.set('Cache-Control','no-cache');
	this.body = yield render('test', {title:"title_test", "body":"it's my body!"} );
}));
//本地mock
app.use(controller.get('/api_test',function *(){
	this.set('Cache-Control','no-cache');
	this.body = service.get_test_data();
}));

//页面路由
app.use(controller.get('/',function *(){
	this.set('Cache-Control','no-cache');
	this.body = yield render('index', {title:"书城首页", "body":"it's my body!"} );
}));
app.use(controller.get('/search',function *(){
	this.set('Cache-Control','no-cache');
	this.body = yield render('search', {title:"搜索", nav:'搜索'} );
}));
app.use(controller.get('/admin',function *(){
	this.set('Cache-Control','no-cache');
	this.body = yield render('admin', {title:"用户登录", nav:'用户登录'} );
}));


var User= require('./models/user');
//登录
app.use(controller.get('/admin/user',function( req, res){
	var params= qs.parse(this.req._parsedUrl.query);
	var username=params.username;
	console.log(username);
	//this.body = yield render('user', {title:"用户登录", username:username} );
	
	res.render('admin' , {username: username,title:'登陆成功'});
	
	console.log(1);
	
}));
//admin 注册
app.use(controller.post('/admin',function(req, res){
	var username=req.body.user.username;
	var userObj =req.body.user;
	var _user;
	if ( username !== 'undefined') {
		User.findByUsername(id , function(err, user){
			if (err) {
				console.log(err);
			}
			_user =_.extend(user, userObj);
			_user.save(function(err, user){
				if (err) {
					console.log(err);
				}
				res.redirect('/admin/'+username);
			});
		})	
	}else{
		_user = new User({
			username:userObj.username,
			password:userObj.password
		});
	}
}));


app.use(controller.get('/female',function *(){
	this.set('Cache-Control','no-cache');
	this.body = yield render('female', {nav:'女生频道',title:"女生专页"} );
}));
app.use(controller.get('/male',function *(){
	this.set('Cache-Control','no-cache');
	this.body = yield render('male', {nav:'男生频道',title:"男生专页"} );
}));
app.use(controller.get('/rank',function *(){
	this.set('Cache-Control','no-cache');
	this.body = yield render('rank', {nav:'排行',title:'排行'} );
}));
app.use(controller.get('/category',function *(){
	this.set('Cache-Control','no-cache');
	this.body = yield render('category', {nav:'分类',title:'分类'} );
}));
app.use(controller.get('/book',function *(){
	this.set('Cache-Control','no-cache');
	var params= qs.parse(this.req._parsedUrl.query);
	var book_id=params.id;
	this.body = yield render('book', {nav:'书籍详细',bookId:book_id} );
	console.log(book_id+"--- index点击后跳转至/book页面");
}));
app.use(controller.get('/reader',function *(){
	this.set('Cache-Control','no-cache');
	this.body = yield render('reader', {nav:'阅读器',title:'阅读器'} );
}));
app.use(controller.get('/buy',function *(){
	this.set('Cache-Control','no-cache');
	this.body = yield render('buy', { title:'购买', nav:'购买'} );
}));

//以上为测试
//性别频道
app.use(controller.get('/ajax/female',function *(){
	this.set('Cache-Control','no-cache');
	this.body = service.get_female_data();
}));
app.use(controller.get('/ajax/male',function *(){
	this.set('Cache-Control','no-cache');
	this.body = service.get_male_data();
}));
//主页
app.use(controller.get('/ajax/index',function *(){
	this.set('Cache-Control','no-cache');
	this.body = service.get_index_data();
}));

//排名
app.use(controller.get('/ajax/rank',function *(){
	this.set('Cache-Control','no-cache');
	this.body = service.get_rank_data();
}));
//分类
app.use(controller.get('/ajax/category',function *(){
	this.set('Cache-Control','no-cache');
	this.body = service.get_category_data();
}));
app.use(controller.get('/ajax/bookbacket',function *(){
	this.set('Cache-Control','no-cache');
	this.body = service.get_bookbacket_data();
}));

app.use(controller.get('/ajax/chapter',function *(){
	this.set('Cache-Control','no-cache');
	this.body = service.get_chapter_data();
}));


//走线上的接口
//
app.use(controller.get('/ajax/book',function *(){
	this.set('Cache-Control','no-cache');
	var params= qs.parse(this.req._parsedUrl.query);
	var id = params.id || "";
	this.body =service.get_book_data(id);
}));

app.use(controller.get('/ajax/chapter', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = service.get_chapter_data();
}));

app.use(controller.get('/ajax/chapter_data',function *(){
	this.set('Cache-Control','no-cache');
	var params= qs.parse(this.req._parsedUrl.query);
	var id = params.id || "";
	var section = params.section || "";
	this.body =service.get_chapter_content_data(id,section);
}));
//搜索
app.use(controller.get('/ajax/search',function *(){
	this.set('Cache-Control','no-cache');
	var params= qs.parse(this.req._parsedUrl.query);
	var start=params.start;
	var end =params.end;
	var keyword =params.keyword;
	this.body =yield service.get_search_data(start, end , keyword );
}));


app.listen(3000);
console.log('koa server running at http://127.0.0.1:3000');