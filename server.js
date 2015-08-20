//load express and create the app
var express = require('express');
var app 		= express();
var path		= require('path');
var mongoose	= require('mongoose');

mongoose.connect('mongodb://localhost/thefonso_node');

//send our index.html file to the user with a GET route
app.get('/', function(request, response){
	response.sendFile(path.join(__dirname + '/index.html'));
});

// ===routes for the admin section===

// get an instance of the router
var adminRouter = express.Router();

//must be placed after router declaration
//route middleware that will happen on every request
adminRouter.use(function(request, response, next){
	//log to console each request
	console.log(request.method, request.url);
	//continue doing stuff
	next();
});

//route middleware with params for name validation
adminRouter.param('name', function(request, response, next, name){
	//do validation on name
	//log somthing so we know it's working
	console.log('doing name validations on ' + name);

	//once validation is done save the new item in the request
	request.name = name;
	//go to the next thing
	next();
});

//the route with the param being validated
adminRouter.get('/hello/:name', function(request, response){
	response.send('hello ' + request.name + '!');
});

// admin dashboard (/admin)
adminRouter.get('/', function(request, response){
	response.send('Admin Dashboard');
});

//a user page (/admin/users)
adminRouter.get('/users', function(request, response){
	response.send('all the users');
});

// post page (/admin/posts)
adminRouter.get('/posts', function(reguest, response){
	response.send('all the posts');
});

//apply the routes
app.use('/admin', adminRouter);

//start server
app.listen(1337);
console.log('find it on localhost:1337');