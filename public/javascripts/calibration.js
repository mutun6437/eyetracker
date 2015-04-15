
var target = document.getElementById("calibration");


function calibration(){

	if(step===0){
		alert("表示されたマーカーを見ながらクリックしてください");
		step++;
	}else if(step===1){
		posTarget(screen.width/2,screen.height/2);
	}

	//console.log("円を書きます"+document.body.width);

	
	



}






function posTarget(x,y){
	target.style.top = y+"px";
	target.style.left = x+"px";
}