const cityData = [
    {
        name: "",
        lat: "",
        lon: ""
    },
    {
        name: "台北",
        lat: 25.09108,
        lon: 121.5598
    },
    {
        name: "台中",
        lat: 24.23321,
        lon: 120.9417
    },
    {
        name: "高雄",
        lat: 23.01087,
        lon: 120.666
    },
    {
        name: "桃園",
        lat: 24.93759,
        lon: 121.2168
    },
    {
        name: "台南",
        lat: 23.1417,
        lon: 120.2513
    },
    {
        name: "彰化",
        lat: 23.99297,
        lon: 120.4818
    },
    {
        name: "屏東",
        lat: 22.54951,
        lon: 120.62
    },
    {
        name: "雲林",
        lat: 23.75585,
        lon: 120.3897
    },
    {
        name: "苗栗",
        lat: 24.48927,
        lon: 120.9417
    },
    {
        name: "嘉義",
        lat: 23.45889,
        lon: 120.574
    },
    {
        name: "新竹",
        lat: 24.70328,
        lon: 121.1252
    },
    {
        name: "南投",
        lat: 23.83876,
        lon: 120.9876
    },
    {
        name: "宜蘭",
        lat: 24.69295,
        lon: 121.7195
    },
    {
        name: "新竹市",
        lat: 24.80395,
        lon: 120.9647
    },
    {
        name: "基隆市",
        lat: 25.10898,
        lon: 121.7081
    },
    {
        name: "花蓮",
        lat: 23.7569,
        lon: 121.3542
    },
    {
        name: "嘉義市",
        lat: 23.47545,
        lon: 120.4473
    },
    {
        name: "台東",
        lat: 22.98461,
        lon: 120.9876
    },
    {
        name: "金門",
        lat: 24.43679,
        lon: 118.3186
    },
    {
        name: "澎湖",
        lat: 23.56548,
        lon: 119.6151
    },
    {
        name: "連江",
        lat: 26.19737,
        lon: 119.5397
    }
];




/*
接下来是一个立即执行函数(function() {...})();，它包含了一些操作。在这个函数中：

使用循环遍历cityData数组，将城市名称添加到HTML页面中的<select>元素中作为选项。
监听<select>元素的change事件，当选择的城市发生变化时，调用loadServerData函数加载选中城市的天气信息。
调用getLatLon函数获取用户的当前经纬度信息，并调用getNearby函数查找最近的城市并显示其天气信息。
*/

(function() {
 
    getLatLon(); 
     
    
    
  })();
    
/*
getNearby函数用于计算用户当前位置与每个城市之间的欧几里得距离，并找到最近的城市。
然后，它调用GetWeather函数来获取最近城市的天气信息，并将最近城市的名称显示在页面中。
*/ 
  function getNearby(lat,lng){

    let min = 10000;
    const paragraph = document.getElementById("city_nearby");

    // Update the text content
    for (let x = 0; x < cityData.length; x++) {
        distance = calculateEuclideanDistance(cityData[x].lat, cityData[x].lon, lat, lng);
        if(min > distance){

            min = distance ;
            minCity = cityData[x].name;
            min_x = x
        }
    }

    minCity = "距離您最近的城市為" +minCity;

    GetWeather(cityData[min_x].lat, cityData[min_x].lon)
    // alert(minCity);
    paragraph.textContent = minCity;


  }
  
//calculateEuclideanDistance函数用于计算两个经纬度之间的欧几里得距离。
  function calculateEuclideanDistance(lat1, lon1, lat2, lon2) {

     dLat = lat2 - lat1;
     dLon = lon2 - lon1;
    //  alert(dLat);
    
     distance = Math.sqrt(dLat * dLat + dLon * dLon);
    
    return distance.toFixed(2); // Return distance rounded to 2 decimal places
} 


/*
getLatLon函数使用浏览器的地理定位功能获取用户的当前经纬度信息，
并调用getNearby函数来获取最近城市的天气信息。
*/
function getLatLon(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            console.log(`Location: ${lat}, ${lng}`);
            // const locationData = `Location: ${lat}, ${lng} ` + currentTime;
            getNearby(lat,lng); 
          },
          handleGeolocationError
        );
        return lat,lng
      } else {
        alert("Geolocation is not supported by this browser.");
      }

}

//getCurrentTime函数返回一个Promise对象，用于获取当前时间。
  function getCurrentTime() {
    return new Promise((resolve, reject) => {
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth() + 1;
      const date = today.getDate();
      const hour = today.getHours();
      const minute = today.getMinutes();
      const second = today.getSeconds();

      const currentTime = `${year}/${month}/${date} ${hour}:${minute}:${second}`;
      resolve(currentTime);
    });
  }

    
//handleGeolocationError函数用于处理地理定位错误的情况。
  function handleGeolocationError(error) {
    alert(
      `Geolocation error occurred. Error code: ${error.code}. Error message: ${error.message}`
    );
  }

//loadServerData函数用于加载选中城市的天气信息，并调用GetWeather函数来获取天气数据。
  function loadServerData() {
    $("#result").empty();
    
    // Retrieve the selected city data from the cityData object
    const selectedCity = cityData[this.value];
    GetWeather(selectedCity.lat, selectedCity.lon);
    

  }
  
  // Assuming you have a change event listener on the dropdown element
//   $("#cityDropdown").on("change", loadServerData);
  

//GetWeather函数通过使用OpenWeatherMap API来获取指定经纬度位置的天气信息，
//并将结果显示在页面上。

function GetWeather(lat, lon){
    // if (!selectedCity) return;
    const weatherAPI_URL ="https://api.openweathermap.org/data/2.5/weather";
    // const weatherMapAPIKey = "70bdb75eabf012b28308a9600a7225a5";
    const weatherMapAPIKey = "886705b4c1182eb1c69f28eb8c520e20";

    $.getJSON(weatherAPI_URL, {
      lat: lat,
      lon: lon,
      appid: weatherMapAPIKey,
      units: 'metric',
      lang: 'zh_tw'
    })
      .done(function(data) {
		  //data.weather[0].description;
        console.log("Success");
        $("#result").append(`<p>氣溫: ${data.main.temp_min}~ ${data.main.temp_max}</p>`);
        $("#result").append(`<p><img src='https://openweathermap.org/img/wn/${data.weather[0].icon}.png'>${data.weather[0].description}</p>`);
		 
		 if (data.weather[0].description.includes("雨")) {//雲
			//$(".rain i").css("display", "none"); 
			$(".rain i").show(); // 显示 .rain 样式的元素  
			$(".box-wrap").css("background", "linear-gradient(to bottom,#333366 0, #000 100%)");
			
			$(".cloud .dtl:before, .cloud .dtl:after").css("background", "linear-gradient(to bottom,#333366 0, #000 100%)");
			$(".taiwan-text").css("color", "white");
			//$(".text-gradient").css("color", "white");
			
			
			/*$(".cloud").css("background", "#333366");
			$(".cloud .dtl").css("background", "#333366");
			$(".cloud.cloud-2").css("background", "#333366");
			$(".cloud.cloud-3").css("background", "#333366");
			$(".cloud .dtl:before").css("background-color", "#333366");
			$(".cloud .dtl:after").css("background-color", "#333366");*/
			
			$(".circle").hide();
		 }
		 else {//sunny 
			$(".rain i").hide(); // 隐藏 .rain 样式的元素 
			$(".circle").show();
		 }
		
      })
      .fail(function() {
        console.log("Error");
      })
      .always(function() {
        console.log("Always");
      });

} 
 