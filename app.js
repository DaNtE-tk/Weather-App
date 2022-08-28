const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function (req, res){
  res.sendFile(__dirname +'/index.html');
});

app.post("/", function (req, res){
  const query = req.body.cityName;
  const apiKey = 'd8694c2bc8fdc09b42050191dbc396ed';
  const unit = 'metric';
  const url = 'https://api.openweathermap.org/data/2.5/weather?q='+ query +'&appid='+apiKey+'&units='+unit;
  https.get(url, function(response){
    console.log(response.statusCode);
    response.on('data', function(data){
      const wdata = JSON.parse(data);
      const wtemp = wdata.main.temp;
      const wdesc = wdata.weather[0].description;
      const icon = wdata.weather[0].icon
      const imageURL = 'http://openweathermap.org/img/wn/'+icon +'@2x.png';
      res.write("<p> The weather is currently "+wdesc+".</p>");
      res.write("<h1>The temperature in "+ query +" is "+wtemp+"degree kelvin.</h1>");
      res.write('<img src='+imageURL+'>');
      res.send();
    })
  });

  console.log("post received.");
});

app.listen(3000,function(){
  console.log("The local-server is being hosted at port:3000.");
});
