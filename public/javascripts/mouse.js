
var mouses = document.getElementById("mouses");



function renderAxis(){
		///////////////////////////////
		// 記述部分////////////
		//////////////////////////////


		var positions = ctrack.getCurrentPosition();

		//鼻頭と左目の距離取得
		leftValueX = Math.floor((positions[[33]][0]-positions[[27]][0])*100-2600);
		leftValueY = Math.floor((positions[[33]][1]-positions[[27]][1])*100);

		//鼻頭と右目の距離取得
		rightValueX = Math.floor((positions[[32]][0]-positions[[33]][0])*100);
		rightValueY = Math.floor((positions[[33]][1]-positions[[32]][1])*100);





		//マウス座標に
		valueX = preLeftValueX*0.99+leftValueX*0.01;
		valueY = leftValueY;

		drawMouse(valueX,valueY);
		//console.log(valueX);
		document.getElementById("left").innerHTML="X:"+leftValueX+"\nY:"+leftValueY;
		document.getElementById("right").innerHTML="X:"+rightValueX+"\nY:"+rightValueY;

		
		//以前のデータを更新
		preLeftValueX=leftValueX;
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