

$(document).ready(function(){
  // data is an array
  // var dataHK = [];
  // var dataLondon = [];
  // var urlHK = 'http://api.openweathermap.org/data/2.5/history/city?q=HongKong&type=hour';
  // var urlLondon = 'http://api.openweathermap.org/data/2.5/history/city?q=London&type=hour';
    var index = 0;
    var lastData = [];
  {//list of countries
    var countries = [
      {
        name: 'Hong Kong',
        url: 'http://api.openweathermap.org/data/2.5/history/city?q=HongKong&type=hour'
      },
      {
        name: 'London',
        url: 'http://api.openweathermap.org/data/2.5/history/city?q=London&type=hour'
      }
    ]
  }
  

  {  //ajax get data request
    var grabData = function(name,url){
      $.ajax({
        type: 'GET',
        url: url,
        datatype: 'JSON',
        success: function(response){
          // getting 1 temperature
          // console.log(response.list[0].main.temp);
          // loop to getting all temperatures
          var sData = []
          $(response.list).each(function(){
            // console.log(this.main.temp);
            // console.log(this.dt);
            // collecting each data point
            var dataPoint = {};
            dataPoint.y = this.main.temp;
            dataPoint.x = this.dt*1000;
            // add each datapoint to data array
            sData.push(dataPoint);
          });
          var series = {
            name: name,
            data: sData
          };
          lastData.push(series);
          getMontly();
          getQu
          getAnnu
          // print out data;
          // console.log(data);
          // Initialize highCharts
          index++;

          if (index >= countries.length){
            initializeHighChart();
          }
          
        },
        error: function(){
          alert("couldn't hit me bro!");
        }
      });
    }
  }
  {
    for (i in countries){
      grabData(countries[i].name,countries[i].url);
    }
  }
  { //Chart settings
    function initializeHighChart(){
      $('#chart').highcharts({
        //key: value
        title: {
          text: 'Historical Temperatures of Hong Kong and London'
        },
        subtitle: {
          text: 'openweathermap.org'
        },
        xAxis: {
          // config of xAxis
          type: 'datetime',
          dateTimeLabelFormats: {
              millisecond: '%H:%M:%S.%L',
              second: '%H:%M:%S',
              minute: '%H:%M',
              hour: '%H:%M',
              day: '%e. %b',
              week: '%e. %b',
              month: '%b \'%y',
              year: '%Y'
          }
        },
        yAxis: {
          // config of yAxis
          min: 270,
          max: 300,
          title: {
              text: 'Temperature (°K)'
          }
        },
        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle',
          borderWidth: 0
        },
        series: lastData
      });
    }
  }
  // grabData(dataHK, urlHK);
  // grabData(dataLondon, urlLondon);
});