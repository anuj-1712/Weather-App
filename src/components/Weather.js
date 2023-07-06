import React from "react";
import { useEffect, useState } from "react";
import sunny from "./assets/sunny.png";
import rain from "./assets/rain.png";
import mist from "./assets/mist.png";
import clouds from "./assets/cloud.png";
import storm from "./assets/storm.png";
import haze from "./assets/haze.png";
import Loading from "./Loading";
import Addlocation from "./Addlocation";

export default function Weather() {
  const api = {
    key: "0f3ff0a8954da3202c52854a04f59ecb"
  };

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  /**************** states ****************/
  const [day, setDay] = useState();
  const [date, setDate] = useState();
  const [lat, setLat] = useState(19.07);
  const [lon, setLon] = useState(72.87);
  const [city, setCity] = useState();
  const [country, setCountry] = useState();
  const [temp, setTemp] = useState(20);
  const [weather, setWeather] = useState();
  const [humidity, setHumidity] = useState();
  const [pressure, setPressure] = useState();
  const [windSpeed, setWindSpeed] = useState();
  const [loading , setLoading] = useState(true)

  /**************** Functions ****************/
  // displaying the date and day to the user
  const dateBuilder = () => {
    let d = new Date();
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = d.getMonth() + 1;
    let year = d.getFullYear();
    setDay(day);
    setDate(`${date}/${month}/${year}`);
  };

  //  fetching the data of weather
  const getdata = async (lat, lon) => {
    let data = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api.key}`
    );
    let res = await data.json();
    setCity(res.name);
    setCountry(res.sys.country);
    setTemp(Math.round(res.main.temp));
    setWeather(res.weather[0].main);
    setHumidity(res.main.humidity);
    setPressure(res.main.pressure);
    setWindSpeed(Math.round(res.wind.speed));
  };

  //  getting the latitude and longitude details of user
  const getPosition = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  // changing the background according to the user's location
  const changeBackground = () => {
    switch (weather) {
      default:
        document.body.style.background = "linear-gradient(#9AC5F4, #A5D7E8)";
        break;
      case "Haze":
        document.body.style.background = "linear-gradient(#9AC5F4, #A5D7E8)";
        break;
      case "Mist":
        document.body.style.background = "linear-gradient(#9DB2BF,#27374D)";
        break;
      case "Clouds":
        document.body.style.background = "linear-gradient(skyblue,black)";
        break;
      case "Thunderstorm":
        document.body.style.background =
          "linear-gradient(45deg, black, #66347F)";
        break;
    }
  };
  // getting the location details of the user and fetching the data of weather in that particular location
  useEffect(() => {
    if (navigator.geolocation) {
      getPosition()
        .then((position) => {
          setLon(position.coords.longitude);
          setLat(position.coords.latitude);
          setLoading(false)
          getdata(lat, lon);
          dateBuilder();
          changeBackground();
        })
        .catch((err) => {
          console.error(`Error occurred while retrieving position: ${err}`);
        });
    } else {
      alert("GeoLocation is not supported by this browser.");
    }
  });

  return (
    <>
      {loading === true ? (
        <Loading />
      ) : (
        <div>
        <Addlocation apikey={api.key} />
          {/* displaying the city, temp , and day */}
          <div className=" w-5/6 mx-auto my-8 flex flex-wrap justify-between gap-4">
            <div className="flex flex-col items-center">
              <h1 className="font-sans text-1xl sm:text-2xl lg:text-3xl text-white">
                {city},{country}
              </h1>
              <div className="flex items-center gap-2">
                <p className="font-sans text-1xl lg:text-2xl text-white">
                  {temp} C,
                </p>
                <img
                  src={
                    weather === "Clouds"
                      ? clouds
                      : weather === "Haze"
                      ? haze
                      : weather === "Mist"
                      ? mist
                      : weather === "Rain"
                      ? rain
                      : weather === "Thunderstorm"
                      ? storm
                      : sunny
                  }
                  className=" w-8 h-8"
                  alt="weather icon"
                ></img>
                <p className="font-sans text-1xl lg:text-2xl text-white">
                  {weather}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <p className="font-sans text-1xl sm:text-2xl lg:text-3xl text-white">
                {day}
              </p>
              <p className="font-sans text-1xl lg:text-2xl text-white">
                {date}
              </p>
            </div>
          </div>

          {/* displaying the wind speed , precipation chances and */}
          <div className="flex flex-col justify-start w-5/6 mx-4 mb-8  text-white">
            <div className="flex items-center gap-2 text-1xl sm:text-2xl my-4">
              <i className="fa-sharp fa-solid fa-cloud-rain fa-2x"></i>{" "}
              {humidity} %
            </div>
            <div className="flex items-center gap-2 text-1xl sm:text-2xl my-4">
              <i className="fa-solid fa-wind fa-2x"></i> {windSpeed} Km/h
            </div>
            <div className="flex items-center gap-2 text-1xl sm:text-2xl my-4">
              <i className="fa-solid fa-gauge-simple-high fa-2x"></i> {pressure}{" "}
              hPa
            </div>
          </div>
        </div>
      )}
    </>
  );
}
