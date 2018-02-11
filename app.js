var express= require("express");
var socket= require("socket.io");

var port = process.env.PORT || 3000;
var app= express();

app.use(express.static("./assets"));

app.get("/lecxyz",function(req,res){
	res.sendfile("lecturer.html");
});

app.get("/attendee",function(req,res){
	res.sendfile("attendee.html");
});

var server= app.listen(port, function(){
	console.log("listening to port 3000");
}); 

var points_sum=0;
var response_no=0;
var yes=0;
var no=0;

var io= socket(server);
io.on("connection",function(socket){
	console.log("made socket connection", socket.id);
	socket.on("chat",function(data){
		io.sockets.emit("chat",data);
	});
	socket.on("typing",function(data){
		console.log("it's about typing");
		socket.broadcast.emit("typing",data);
	});
	socket.on("rating",function(data){
		console.log("rating review");
		socket.broadcast.emit("rating",data);
		if(data.status=="on"){
			points_sum=0;
			response_no=0;
		}
	});
	socket.on("rate",function(data){
		console.log("got a review");
		points_sum+= data.points;
		response_no++;
		io.sockets.emit("rate",{
			points_sum: points_sum,
			response_no: response_no
		});
	});
	socket.on("yesno",function(data){
		console.log("yesno review");
		socket.broadcast.emit("yesno",data);
		if(data.status=="on"){
			yes=0;
			no=0;
		}
	});
	socket.on("yn",function(data){
		console.log("got a yn review");
		if(data.yn==0)
			no++;
		else
			yes++;
		io.sockets.emit("yn",{
			yes: yes,
			no: no
		});
	});
	socket.on("doubts",function(data){
		console.log("doubts");
		socket.broadcast.emit("doubts",data);
		if(data.status=="on"){
			
		}
	});
	socket.on("doubt",function(data){
		console.log("got a doubt");
		doubt= data.doubt;
		io.sockets.emit("doubt",{
			doubt: doubt
		});
	});
});





