var dev_count=0;
function developer(){
	if(dev_count%2==0)
		$('.developer-ttarget').tapTarget('open');
	else
		$('.developer-ttarget').tapTarget('close');
	dev_count++;
}
var lec_count=0;
function role_lec(){
	if(lec_count%2==0)
		$('.lecturer-ttarget').tapTarget('open');
	else
		$('.lecturer-ttarget').tapTarget('close');
	lec_count++;
}
var points_sum=0;
var response_no=0;
var yes=0;
var no=0;
var url= "http://127.0.0.1:3000/";
//var url="https://lecreview.herokuapp.com/";
var socket= io.connect(url);
function ratingrev(checkbox){
	if(checkbox.checked == true){
        console.log("checked");
        socket.emit("rating",{
			status: "on"
		});
		for(i=0;i<5;i++){
			console.log("star-"+i);
			document.getElementsByClassName("star-"+i)[0].innerHTML="star_border";
		}
		document.getElementById("total").innerHTML="0";
		document.getElementById("num").innerHTML="0";
		document.getElementsByClassName("rate")[0].style.display="flex";
		points_sum=0;
		response_no=0;
    }
    else{
        console.log("unchecked");
        socket.emit("rating",{
			status: "off"
		});
		document.getElementsByClassName("rate")[0].style.display="none";
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
function yesnorev(checkbox){
	if(checkbox.checked == true){
        console.log("checked");
        socket.emit("yesno",{
			status: "on"
		});
		document.getElementById("yes_count").innerHTML=0
		document.getElementById("no_count").innerHTML=0;
		document.getElementsByClassName("yesno")[0].style.display="flex";
		yes=0;
		no=0;
    }
    else{
        console.log("unchecked");
        socket.emit("yesno",{
			status: "off"
		});
		document.getElementsByClassName("yesno")[0].style.display="none";
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

function doubt(checkbox){
	if(checkbox.checked == true){
		console.log("checked");
		socket.emit("doubts",{
			status: "on"
		});
		document.getElementById("doubts").innerHTML='<span class="doubt white-text"><i class="material-icons">chevron_right</i>Doubts will be displayed here!</span>';
		document.getElementById("doubts").style.display="flex";
	}
	else{
        console.log("unchecked");
        socket.emit("doubts",{
			status: "off"
		});
		document.getElementById("doubts").style.display="none";
	}
}

socket.on("doubt",function(data){
	console.log(data);
	document.getElementById("doubts").innerHTML+='<span class="doubt white-text"><i class="material-icons">chevron_right</i>'+data.doubt+'</span>';

});