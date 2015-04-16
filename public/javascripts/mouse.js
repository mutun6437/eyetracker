
var mouses = document.getElementById("mouses");


var preLeftValueX=0,preRightValueX=0;
var preLeftValueY=0,preRightValueY=0;
var flag = false;


function renderAxis(leftX,leftY,rightX,rightY){
	//console.log(rightX);
		
		if(!flag){
			console.log("初期化");
			preLeftValueX = leftX;
			preLeftValueY = leftY;
			preRightValueX = rightX;
			preRightValueY = rightY;
			flag=true;
		}

		//var positions = ctrack.getCurrentPosition();

		





		//マウス座標に
		valueX = ((preLeftValueX*0.99+leftX*0.01)-(preRightValueX*0.99+rightX*0.01))/2;
		valueY = leftValueY;

	//	var lf = map(leftX,0,1000,0,document.body.width);

		//console.log(valueX);
		var value = centerPointX - centerPositionX;
		console.log("補正値"+value);

		drawMouse(valueX*250+value*10,0);
		//console.log(valueX);
		document.getElementById("left").innerHTML="X:"+valueX+"\nY:"+valueY;
		document.getElementById("right").innerHTML="X:"+rightValueX+"\nY:"+rightValueY;

		
		//以前のデータを更新
		preLeftValueX=leftX;
		preRightValueX=rightX;
		preLeftValueY=leftY;
		preRightValueY=rightY;
}






function drawMouse(x,y){
	console.log();
	mouses.style.top =  (screen.height/2)-y*3-300+"px";
	mouses.style.left = (screen.width/2)+x*3+"px";
}






//map(値, 変換前の値の最小値, 変換前の値の最大値, 変換後の値の最小値, 変換後の値の最大値)
function map(v,sx,sn,dx,dn)
{
return (v - sn) * (dx - dn) / (sx - sn) + dn;
}