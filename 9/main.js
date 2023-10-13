var tmp=-1;
$(function(){
	$("input").on("click",function(){
		//alert("Hi");
		var numberOfListItem=$("li").length;
		var randomChildNumber=Math.floor(Math.random()*numberOfListItem);
		while(tmp==randomChildNumber){randomChildNumber=Math.floor(Math.random()*numberOfListItem);}
		tmp=randomChildNumber;
		
		$("h1").text($("li").eq(randomChildNumber).text());

		if(randomChildNumber==0){$('#myr').show();}
		else{$('#myr').hide();}
		if(randomChildNumber==1){$('#mym').show();}
		else{$('#mym').hide();}
		if(randomChildNumber==2){$('#myd').show();}
		else{$('#myd').hide();}
	}); 
}); 
 