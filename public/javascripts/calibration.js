
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
		posTarget(screen.width/2-target.width,screen.height/2-target.height);
	}else if(step===2){
		centerPointX=centerPositionX;
		posTarget(screen.width-target.width,screen.height/2-target.height);
	}

	//console.log("円を書きます"+document.body.width);

	
	



}






function posTarget(x,y){
	target.style.top = y+"px";
	target.style.left = x+"px";
}