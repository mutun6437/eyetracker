				
				//マウスカーソルの座標
				var valueX,valueY;

				//左目右目の値
				var leftValueX,leftValueY,rightValueX,rightValueY;

				var preLeftValueX=0,preLeftValueY=0,preRightValueX=0,preLeftValueY=0;

				//顔の中心基準点
				var centerPointX = 0;

				var centerPositionX=0;

				//index
				var index = 0;


				var vid = document.getElementById('videoel');
				var overlay = document.getElementById('overlay');
				var overlayCC = overlay.getContext('2d');
				
				var ctrack = new clm.tracker({useWebGL : true});
				ctrack.init(pModel);
				
				stats = new Stats();
				stats.domElement.style.position = 'absolute';
				stats.domElement.style.top = '0px';
				document.getElementById('container').appendChild( stats.domElement );
				
				function enablestart() {
					var startbutton = document.getElementById('startbutton');
					startbutton.value = "start";
					startbutton.disabled = null;
				}
				
				var insertAltVideo = function(video) {
					if (supports_video()) {
						if (supports_ogg_theora_video()) {
							video.src = "./media/cap12_edit.ogv";
						} else if (supports_h264_baseline_video()) {
							video.src = "./media/cap12_edit.mp4";
						} else {
							return false;
						}
						//video.play();
						return true;
					} else return false;
				}
				navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
				window.URL = window.URL || window.webkitURL || window.msURL || window.mozURL;

				// check for camerasupport
				if (navigator.getUserMedia) {
					// set up stream
					
					var videoSelector = {video : true};
					if (window.navigator.appVersion.match(/Chrome\/(.*?) /)) {
						var chromeVersion = parseInt(window.navigator.appVersion.match(/Chrome\/(\d+)\./)[1], 10);
						if (chromeVersion < 20) {
							videoSelector = "video";
						}
					};
				
					navigator.getUserMedia(videoSelector, function( stream ) {
						if (vid.mozCaptureStream) {
							vid.mozSrcObject = stream;
						} else {
							vid.src = (window.URL && window.URL.createObjectURL(stream)) || stream;
						}
						vid.play();
					}, function() {
						insertAltVideo(vid);
						document.getElementById('gum').className = "hide";
						document.getElementById('nogum').className = "nohide";
						alert("There was some problem trying to fetch video from your webcam, using a fallback video instead.");
					});
				} else {
					insertAltVideo(vid);
					document.getElementById('gum').className = "hide";
					document.getElementById('nogum').className = "nohide";
					alert("Your browser does not seem to support getUserMedia, using a fallback video instead.");
				}

				vid.addEventListener('canplay', enablestart, false);
				
				function startVideo() {
					//do calibration
					calibration();
					// start video
					vid.play();
					// start tracking
					ctrack.start(vid);
					// start loop to draw face
					drawLoop();
				}


				var bufLeftX =0;
				var bufLeftY =0;
				var bufRightX=0;
				var bufRightY=0;
				var bufCenterX = 0;
				
				function drawLoop() {
					requestAnimFrame(drawLoop);
					overlayCC.clearRect(0, 0, 400, 300);
					//psrElement.innerHTML = "score :" + ctrack.getScore().toFixed(4);
					if (ctrack.getCurrentPosition()) {
						ctrack.draw(overlay);
					}
					//計算
					//console.log(index);
					var positions = ctrack.getCurrentPosition();

					bufLeftX += positions[[33]][0]-positions[[27]][0];
					bufLeftY += positions[[33]][1]-positions[[27]][1];

					bufRightX += positions[[32]][0]-positions[[33]][0];
					bufRightY += positions[[33]][1]-positions[[32]][1];

					bufCenterX +=positions[[62]][0];

					if(index%5==0){
						var leftX = bufLeftX/5;
						var leftY = bufLeftY/5; 
						var rightX = bufRightX/5;
						var rightY = bufRightY/5; 
						centerPositionX = bufCenterX/5;

						console.log("フレーム");
						renderAxis(leftX,leftY,rightX,rightY);

						bufLeftX=0;
						bufLeftY=0;
						bufRightX=0;
						bufRightY=0;
						bufCenterX=0;
					}
					

					index++;
				}
				
				// update stats on every iteration
				document.addEventListener('clmtrackrIteration', function(event) {
					stats.update();
				}, false);