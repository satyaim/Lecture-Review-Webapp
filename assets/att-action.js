var dev_count=0;
function developer(){
	if(dev_count%2==0)
		$('.developer-ttarget').tapTarget('open');
	else
		$('.developer-ttarget').tapTarget('close');
	dev_count++;
}
var att_count=0;
function role_att(){
	if(att_count%2==0)
		$('.attendee-ttarget').tapTarget('open');
	else
		$('.attendee-ttarget').tapTarget('close');
	att_count++;
}
var points_sum=0;
var response_no=0;
var yes=0;
var no=0;
var url= "http://127.0.0.1:3000/";
//var url="https://lecreview.herokuapp.com/";
var socket= io.connect(url);
socket.on("rating", function(data){
	if(data.status=="off"){
		console.log("Turn Off Rating");
		document.getElementsByClassName("rating")[0].style.display="none";
		Materialize.toast("Rating Review Turned Off", 2000, 'toast-todo');
	}
	else if(data.status=="on"){
		console.log("Turn On Rating");
		for(i=0;i<5;i++){
			console.log("star-"+i);
			document.getElementsByClassName("star-"+i)[0].innerHTML="star_border";
		}
		document.getElementById("total").innerHTML="0";
		document.getElementById("num").innerHTML="0";
		document.getElementsByClassName("rating")[0].style.display="flex";
		Materialize.toast("Rating Review Started", 2000, 'toast-todo');
		points_sum=0;
		response_no=0;
	}
});
function rate(){
	var x=  parseInt(document.getElementById('points').value);
	if(x>=1 && x<=5){
		Materialize.toast("Submitting Review", 2000, 'toast-todo');
		socket.emit("rate",{
			points: x
		});
	}
}
socket.on("rate",function(data){
	console.log(data);
	if(data.response_no>response_no){
		response_no=data.response_no;
		points_sum=data.points_sum;
	}
	document.getElementById("total").innerHTML=points_sum;
	document.getElementById("num").innerHTML=response_no;
	for(i=0;i<(points_sum/response_no);i++){
		console.log("star-"+i);
		document.getElementsByClassName("star-"+i)[0].innerHTML="star";
	}
	i--;
	if(points_sum%response_no!=0)
		document.getElementsByClassName("star-"+i)[0].innerHTML="star_half";
	i++;
	for(i;i<5;i++){
		console.log("star-"+i);
		document.getElementsByClassName("star-"+i)[0].innerHTML="star_border";
	}
});
socket.on("yesno", function(data){
	if(data.status=="off"){
		console.log("Turn Off Yes/No");
		document.getElementsByClassName("yesno")[0].style.display="none";
		Materialize.toast("Yes/No Review Turned Off", 2000, 'toast-todo');
	}
	else if(data.status=="on"){
		console.log("Turn On Yes/No");
		document.getElementById("yes_count").innerHTML=0;
		document.getElementById("no_count").innerHTML=0;
		document.getElementsByClassName("yesno")[0].style.display="flex";
		Materialize.toast("Yes/No Review Started", 2000, 'toast-todo');
		yes=0;
		no=0;
	}
});
function y_n(){
	if(document.getElementById("yes").checked||document.getElementById("no").checked){
		Materialize.toast("Submitting Review", 2000, 'toast-todo');
		if(document.getElementById("yes").checked)
			yn=1;
		else
			yn=0;
		socket.emit("yn",{
			yn: yn
		});
	}
}
socket.on("yn",function(data){
	console.log(data);
	if(data.yes>yes||data.no>no){
		no=data.no;
		yes=data.yes;
	}
	document.getElementById("yes_count").innerHTML=yes;
	document.getElementById("no_count").innerHTML=no;
});

var socket= io.connect(url);
socket.on("doubts", function(data){
	if(data.status=="off"){
		console.log("Turn Off Doubts");
		document.getElementsByClassName("doubts")[0].style.display="none";
		Materialize.toast("Doubts Turned Off", 2000, 'toast-todo');
	}
	else if(data.status=="on"){
		console.log("Turn On Doubts");
		document.getElementsByClassName("doubts")[0].style.display="flex";
		Materialize.toast("Doubts Review Started", 2000, 'toast-todo');
	}
});

function doubt(){
	var doubt= document.getElementById('doubt').value;
	if(doubt!=""){
		Materialize.toast("Submitting Doubt", 2000, 'toast-todo');
		socket.emit("doubt",{
				doubt: doubt
		});
		document.getElementById('doubt').value="";
	}
	else {
		Materialize.toast("Enter Doubt First", 2000, 'toast-todo');
	}
}