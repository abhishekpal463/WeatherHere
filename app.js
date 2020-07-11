//jshint esversion:6
const express=require("express");
const app=express();
const bodyParser=require("body-parser");
require('dotenv').config();

app.use(bodyParser.urlencoded({extended:true}));
const https=require("https");
//////////////////////////////////////
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
//////////////////////////////////////////

app.get("/",function(req,res){
res.render("index");
});

app.post("/" ,function(req,res){
  const loc=req.body.city;
  const api=process.env.API_KEY;
  const url="https://api.openweathermap.org/data/2.5/weather?q="+loc+"&appid="+api+"&units=metric";
  https.get(url,function(response){
    if(response.statusCode==200)
      {
        response.on("data",function(data){
      const report=JSON.parse(data);
      const name=report.name;
      const country=report.sys.country;
      const temp=report.main.temp;
      const feel=report.main.feels_like;
      const des=report.weather[0].description;
      const humidity=report.main.humidity;
      const pressure=report.main.pressure;
      const windSpeed=report.wind.speed;
      const icon="http://openweathermap.org/img/wn/"+report.weather[0].icon+"@2x.png";
      res.render("result",{
        temperature:temp,
        description:des,
        icon:icon,
        country:country,
        city:name,
        pressure:pressure,
        humidity:humidity,
        windSpeed:windSpeed,
        feel:feel
      });
    });
      }
    else
      {
        res.render("failure");
      }
  });
});

app.listen(3000,function(){
console.log("Server Started");
});
