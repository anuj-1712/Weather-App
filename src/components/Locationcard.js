import React from "react";
import sunny from "./assets/sunny.png"
import rain from "./assets/rain.png";
import mist from "./assets/mist.png";
import clouds from "./assets/cloud.png";
import storm from "./assets/storm.png";
import haze from "./assets/haze.png";

export default function Locationcard(props) {
  return (
    <>
      <div
        className="rounded-lg w-11/12 my-4"
        id="location-card"
        style={{
          background:
            props.weather === "Clouds"
              ? "linear-gradient(45deg ,skyblue,black)"
              : props.weather === "Haze"
              ? "linear-gradient(45deg, #9AC5F4, #A5D7E8)"
              : props.weather === "Mist"
              ? "linear-gradient(45deg,#9DB2BF,#27374D)"
              : props.weather === "Rain"
              ? "linear-gradient(45deg,black, #526D82)"
              : props.weather === "Thunderstorm"
              ? "linear-gradient(45deg, black, #66347F)"
              : props.weather === "Drizzle"
              ? "linear-gradient(45deg, #27374D, #A5D7E8)"
              : "linear-gradient(45deg, #DDE6ED, #A5D7E8)",
        }}
      >
        <div className="flex w-11/12 my-4 mx-auto justify-between">
          <p className="text-white text-1xl">
            {props.cityname},{props.country}
          </p>
          <p className="text-white text-1xl">{props.temp} C</p>
        </div>
        <div className="flex w-11/12 my-4 mx-auto justify-between">
          <p className="text-white text-1xl">{props.humidity} %</p>
          <div className="flex gap-2 items-center">
            <img
              src={
                props.weather === "Clouds"
                  ? clouds
                  : props.weather === "Haze"
                  ? haze
                  : props.weather === "Mist"
                  ? mist
                  : props.weather === "Rain"
                  ? rain
                  : props.weather === "Thunderstorm"
                  ? storm
                  : sunny
              }
              className=" w-8 h-8"
              alt="weather icon"
            ></img>
            <p className="text-white text-1xl">{props.weather}</p>
          </div>
        </div>
      </div>
    </>
  );
}
