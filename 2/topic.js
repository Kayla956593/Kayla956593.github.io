var topic = ["尚未開學","國定假日","環境準備","停課","隨機性","停課","重複性"];
var startDate= new Date(); 
function setMonthAndDay(startMonth, startDay){
	//一次設定好月份與日期
	startDate.setMonth(startMonth-1,startDay);
	startDate.setHours(0);
	startDate.setMinutes(0);
	startDate.setSeconds(0);
	} 
function input_ym(){ 
	var year_month = prompt("输入月份日期：", "0408 or 48"); 
	if(year_month.length>2){
	setMonthAndDay(year_month.substr(0, 2),year_month.substr(2, 4)); 
	}
	else{
	setMonthAndDay(year_month.substr(0, 1),year_month.substr(1, 2));  
	}
} 

function input_event(){ 
	var event_in = prompt("输入活動：", "停課");  
	topic.push(event_in); 
} 
 
