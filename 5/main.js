let player;
//YouTubePlayer
let currentPlay=0;
//記錄目前撥到第幾首歌

$(function(){
	//儲存目前作答到第幾題
	var currentQuiz=null;
	//當按鈕按下後，要做的事情
	$("#startButton").on("click",function(){

		
		//如果還沒開始作答就從這裡開始
		if(currentQuiz==null){
			//設定目前作答從第0題開始
			currentQuiz=0;
			//顯示題目
			$("#question").text(questions[0].question);
			//將選項區清空(可以試著先不寫)
			$("#options").empty();
			//將選項逐個加入
			questions[0].answers.forEach(
			function(element,index,array){
				$("#options").append(
				`<input name='options' type='radio' 
				value='${index}'><label>${element[0]}</label><br><br>`
				 
				);
			});
			//將按鈕上的文字換成Next
			$("#startButton").attr("value","Next"); 
		}
			
		//已經開始作答從這邊繼續
		else{
			//巡訪哪一個選項有被選取
			$.each($(":radio"),function(i,val){if(val.checked){
				
			//是否已走到最後要產生結果(A~D)
			if(isNaN(questions[currentQuiz].answers[i][1])){ 
				delete player;
				
				//通往最終結果
				var finalResult=questions[currentQuiz].answers[i][1];
				
				//顯示最終結果的標題
				//$("#question").text(finalAnswers[finalResult][0]);
				
				//將選項區域清空
				$("#options").empty();
				
				//顯示最終結果內容
				//$("#options").append(`${finalAnswers[finalResult][1]}<br><br>`);
				//alert(finalAnswers[finalResult][0]);
				
				if(playList[0]==""){
				play(finalAnswers[finalResult][0]); 
				}
				else{
					replay(finalAnswers[finalResult][0]); 
				}
				
				currentQuiz=null;
				
				$("#startButton").attr("value","replay");
				/*
					$("#startButton").on("click",function(){
				alert(currentQuiz);
						hide();
					});*/
					
	}
	else{
		//指定下一題，原始資料從1開始，所以要-1
		currentQuiz=questions[currentQuiz].answers[i][1]-1;
		//顯示新的題目
		$("#question").text(questions[currentQuiz].question);
		$("#options").empty();
		questions[currentQuiz].answers.forEach(
		function(element,index,array){$("#options").append(
		`<input name='options'type='radio'value='${index}'><label>${element[0]}</label><br><br>`);});}
		return false;//跳離迴圈的方式
		}});
		}
		
	});
		
});
 
//YouTubeVideoID
let playList=["","",""];
 
 
function replay(s){
	if(Math.floor(player.getCurrentTime())==playTime[currentPlay][1]){
		if(currentPlay<playList.length-1){
			currentPlay++; 
			
			playList[currentPlay]=s;
			playTime[currentPlay+1]=[101,103]
			
			player.loadVideoById({
				videoId:playList[currentPlay],
				startSeconds:playTime[currentPlay][0],
				endSeconds:playTime[currentPlay][1],
				suggestedQuality:"large"});
		}
		else{
			currentPlay=0;
			//alert(playList);
			player.cueVideoById({
				videoId:playList[currentPlay],
				startSeconds:playTime[currentPlay][0],
				endSeconds:playTime[currentPlay][1],
				suggestedQuality:"large"});
			
		} 
	}  
} 
 
function play(s){
	//alert(playList);
	playList[currentPlay]=s;
	
	player=new YT.Player("player",
					{
					height:"300",
					width:"530",
					videoId:playList[currentPlay],
					playerVars:{
						autoplay:0,//是否自動撥放
						controls:0,//是否顯示控制項
						start:playTime[currentPlay][0],//開始秒數
						end:playTime[currentPlay][1],//結束秒數
						iv_load_policy:3
						},
						events:{
							onReady:onPlayerReady,
							onStateChange:onPlayerStateChange
							}
					});  
					
}
 
//YouTubePlayerReady
function onPlayerReady(event){
	/*$("#playButton").on("click",function(){
		$("h3").text(player.getVideoData().title);
		player.playVideo();
	});*/
	$("#startButton").on("click",function(){
		$("h3").text(player.getVideoData().title);
		//player.playVideo();
	});
}
//PlayerStateChange

function onPlayerStateChange(event){
	/*
	if(Math.floor(player.getCurrentTime())==playTime[currentPlay][1]){
		if(currentPlay<playList.length-1){
			currentPlay++; 
			playList[currentPlay]=s;
			player.loadVideoById({
				videoId:playList[currentPlay],
				startSeconds:playTime[currentPlay][0],
				endSeconds:playTime[currentPlay][1],
				suggestedQuality:"large"});
		}
		else{
			currentPlay=0;
			alert(playList);
			player.cueVideoById({
				videoId:playList[currentPlay],
				startSeconds:playTime[currentPlay][0],
				endSeconds:playTime[currentPlay][1],
				suggestedQuality:"large"});
			
		} 
	}
				
	if(event.data==1){$("h2").text(player.getVideoData().title);}*/
}
