
var target = document.getElementById("calibration");
target.addEventListener("click",function(e){
	step++;
	calibration();
});

var step = 0;

function calibration(){

	if(step===0){
		alert("表示されたマーカーを見ながらクリックしてください");
		step++;
		calibration();
	}else if(step===1){
		posTarget(screen.width/2,screen.height/2-target.height);
	}else if(step===2){
		//右上の位置 maxWidth minHeight
		centerPointX=centerPositionX;
		posTarget(screen.width+target.width,0);
	}else if(step===3){
		maxWidth=result;
		posTarget(0,screen.height-target.height);
	}else if(step===4){
		minWidth=result;
	}

	//console.log("円を書きます"+document.body.width);

	
	



}






function posTarget(x,y){
	target.style.top = y+"px";
	target.style.left = x+"px";
}