$(function(){

var scoreforTiger=0; // = answers[4]+answers[9]+answers[13]+answers[17]+answers[23]+answers[29]; 
var scoreforPeacock=0; // = answers[2]+answers[5]+answers[12]+answers[19]+answers[21] +answers[28]; 
var scoreForKoala=0;// = answers[1]+answers[7]+answers[14]+answers[16]+answers[24]+answers[27]; 
var scoreForOwl=0;// = answers[0]+answers[6]+answers[10]+answers[15]+answers[20]+answers[25]; 
var scoreforChameleon=0;// = answers[3]+answers[8]+answers[11]+answers[18]+answers[22]+answers[26];
var score;
/*	*/

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
				value='${index}'><label>${element[0]}</label><br><br>`);
			});
			//將按鈕上的文字換成Next
			$("#startButton").attr("value","Next");
		}
			
		//已經開始作答從這邊繼續
		else{
			//alert(questions[0].answers[0][1]);
			//巡訪哪一個選項有被選取
			$.each($(":radio"),function(i,val){
			
			if(val.checked)
			{
				//alert(i);
				
				
				//是否已走到最後要產生結果(A~D)
				if(isNaN(questions[currentQuiz].answers[i][1]))
				{
					//通往最終結果
					//var finalResult=questions[currentQuiz].answers[i][1];
					
					//顯示最終結果的標題
					$("#question").text("測驗結果");
					
					//將選項區域清空
					$("#options").empty();
					
					//顯示最終結果內容
					$("#options").append(
					"<b>假若你有某一項分遠遠高於其他四項，你就是典型的這種屬性，假若你有某兩項分大大超過其他三項，你是這兩種動物的綜合；假若你各項分數都比較接近，恭喜你，你是一個面面俱到近似完美性格的人；假若你有某一項分數特別偏低的話，想提高自己就需要在那一種動物屬性的加強上下工夫了。我們就來逐一分析一下各種迥然不同的“動物”吧！</b><br><br>"
					+
					
					'<a href="https://bookmarks.tw/pdp/tiger.html">老虎</a>'+scoreforTiger+"<br>"+
					'<a href="https://bookmarks.tw/pdp/peacock.html">孔雀</a>'+scoreforPeacock+"<br>"+
					'<a href="https://bookmarks.tw/pdp/koala.html">無尾熊</a>'+scoreForKoala+"<br>"+
					'<a href="https://bookmarks.tw/pdp/owl.html">貓頭鷹</a>'+scoreForOwl+"<br>"+
					'<a href="https://bookmarks.tw/pdp/chameleon.html">變色龍</a>'+scoreforChameleon+"<br>"
					  
					
					);
					currentQuiz=null;
					$("#startButton").attr("value","重新開始"); 
				} 
				else{
					 
					score=questions[currentQuiz].answers[i][1]; 
					 
					if(currentQuiz==4||currentQuiz==9||currentQuiz==13||currentQuiz==17||currentQuiz==23||currentQuiz==29){scoreforTiger+=score;}
					else if(currentQuiz==2||currentQuiz==5||currentQuiz==12||currentQuiz==19||currentQuiz==21||currentQuiz==28){scoreforPeacock+=score;}
					else if(currentQuiz==1||currentQuiz==7||currentQuiz==14||currentQuiz==16||currentQuiz==24||currentQuiz==27){scoreForKoala+=score;}
					else if(currentQuiz==0||currentQuiz==6||currentQuiz==10||currentQuiz==15||currentQuiz==20||currentQuiz==25){scoreForOwl+=score;}
					else if(currentQuiz==3||currentQuiz==8||currentQuiz==11||currentQuiz==18||currentQuiz==22||currentQuiz==26){scoreforChameleon+=score;}
					
					//alert(scoreForOwl);
					
					//指定下一題，原始資料從1開始，所以要-1
					currentQuiz++; //=questions[currentQuiz].answers[i][1]-1;
					
					
					//顯示新的題目
					$("#question").text(questions[currentQuiz].question);
					$("#options").empty();
					questions[currentQuiz].answers.forEach(
					function(element,index,array){$("#options").append(`<input name='options'type='radio'value='${index}'><label>${element[0]}</label><br><br>`);});
				}
					return false;//跳離迴圈的方式
			}});
		}
		
	});
				
		
}); 