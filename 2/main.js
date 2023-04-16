$(function(){
	$("#courseTable").append("<tr><th>場次</th><th>時間</th><th>主題</th></tr>");
	let topicCount = topic.length;
	//一秒鐘有1000毫秒
	//每分鐘60秒、每小時60分鐘、每天24小時
	let millisecsPerDay = 24*60*60*1000; 
	 
	 
	$("button").on("click",function(){ 
		
		for(var x=0;x<topicCount;x++){
			
			
			if(topic[x]!="停課"){
			$("#courseTable").append("<tr>"+
			`<td>${x+1}</td>`+
			`<td>${(new Date(startDate.getTime()+7*x*millisecsPerDay)).toLocaleDateString()}</td>`+
			`<td>${topic[x]}</td>`+
			"</tr>");
			}
			else{
				
			$("#courseTable").append("<tr class='stop'>"+
			`<td>${x+1}</td>`+
			`<td>${(new Date(startDate.getTime()+7*x*millisecsPerDay)).toLocaleDateString()}</td>`+
			`<td>${topic[x]}</td>`+
			"</tr>");
			} 
		} 
	});
	
	$("input").on("click",function(){ 
	x=topic.length-1;
			if(topic[x]!="停課"){
			$("#courseTable").append("<tr>"+
			`<td>${x+1}</td>`+
			`<td>${(new Date(startDate.getTime()+7*x*millisecsPerDay)).toLocaleDateString()}</td>`+
			`<td>${topic[x]}</td>`+
			"</tr>");
			}
			else{  
				
			$("#courseTable").append("<tr class='stop'>"+
			`<td>${x+1}</td>`+
			`<td>${(new Date(startDate.getTime()+7*x*millisecsPerDay)).toLocaleDateString()}</td>`+
			`<td>${topic[x]}</td>`+
			"</tr>");
			}  
	});
});
