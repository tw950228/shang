var express = require('express');
var router = express.Router();
var UserModel = require("../model/Str.js")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//登录页面
router.get('/load', function(req, res, next) {
  res.render('load', { title: 'load' });
});

//注册页面
router.get('/reg', function(req, res, next) {
  res.render('reg', { title: 'reg' });
});

//管理页
router.get('/shangs', function(req, res, next) {
	if(req.session == null || req.session.userName == null) {
		res.redirect("/shangs");
		return;
	}
	
  res.render('shangs', { title: 'shangs' });
});

//登录
router.post('/api/load5ajax', function(req, res, next) {
	
	var userName = req.body.userName; 
	var psw = req.body.psw;
console.log(userName,psw);
	var result = {
			code : 1,
			message : "登录成功了"
	};
	
	UserModel.find({userName:userName,psw:psw}, function (err, docs) {
	  	if(docs.length==0){
	  		result.code = -101;
	  		result.message = "您的账号或密码错误，请重新登录";
	
	  	}else{
					req.session.userName = userName;					
			}
	  		res.json(result);
		});
  	 	
});





//注册
router.post('/api/reg5ajax', function(req, res, next) {
	var userName = req.body.userName; 
	var psw = req.body.psw;

	var result = {
			code : 1,
			message : "注册成功了"
	};
	
	UserModel.find({userName:userName}, function (err, docs) {
  	if(docs.length>0){
  		result.code = -109;
  		result.message = "你的用户名已被注册";
  		res.json(result);
  		return;
  	}
  	var um = new UserModel;
		um.userName = userName;
		um.psw = psw;
		um.save(function(err){
			
			if(err){
				result.code = -110;
				result.message = "注册失败了";
				res.send("注册失败了");
			}
			res.json(result);
			
		});
  	 	
	});

});

module.exports = router;
