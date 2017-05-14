var mongoose =require('mongoose');

var UserSchema= new mongoose.Schema({
	username:{
		type:String,
		unique:true
	},
	password:String,
	meta:{
		createAt: {
	    	type: Date,
	    	default: Date.now()
	  	},
		updateAt: {
		    type: Date,
		    default: Date.now()
		  }
	}
}); 
// 模式保存前执行下面函数,如果当前数据是新创建，则创建时间和更新时间都是当前时间，否则更新时间是当前时间
UserSchema.pre('save', function(next){
	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now();
	}else{
		this.meta.updateAt = Date.now();
	}

	next();
});

// 给模型添加静态方法 
UserSchema.statics = {
	fetch: function(cb) {
		return this
			.find({})
			.sort('meta.updateAt');
			exec(cb);
	},
	findById: function(id,cb) {
		return this
			.findOne({_id: id});
			exec(cb);
	},
	findByUsername: function(name,cb) {
		return this
			.findOne({username: name});
			exec(cb);
	}
};

module.exports = UserSchema;