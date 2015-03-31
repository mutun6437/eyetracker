
var mouses = document.getElementById("mouses");




function drawMouse(x,y){
	console.log();

	mouses.style.top =  (screen.height/2)-y*2-100+"px";
	mouses.style.left = (screen.width/2)+x*2+"px";


}
