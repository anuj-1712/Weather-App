import React, { useState } from "react";
import Locationcard from "./Locationcard";
import Searchlist from "./Searchlist";

export default function Addlocation(props) {
  /**************** states ****************/
  const [arr, setArr] = useState([]);
  const [query, setQuery] = useState("");
  const searchList = [
    "Mumbai",
    "Delhi",
    "Kolkata",
    "Bengaluru",
    "Hyderabad",
    "Ahmedabad",
    "Chennai",
    "Pune",
    "Surat",
    "Jaipur",
  ].filter((q) => q.toLowerCase().includes(query.toLowerCase()));
  const [showList, setShowList] = useState(false);
  /**************** Functions ****************/
  const closeNav = () => {
    document.getElementById("sidenav").style.display = "none";
  };

  const opennav = () => {
    document.getElementById("sidenav").style.display = "flex";
  };

  const addData = async () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${props.apikey}`
    )
      .then((res) => res.json())
      .then((data) =>
        setArr(() => {
          return [
            ...arr,
            {
              cityname: data.name,
              country: data.sys.country,
              temp: Math.round(data.main.temp),
              weather: data.weather[0].main,
              humidity: data.main.humidity,
            },
          ];
        })
      )
      .catch((err) => console.log(err));
    setShowList(false);
    setQuery("")
  };

  const removeData = (index) => {
    arr.splice(index, 1);
    setArr([...arr]);
  };

  return (
    <>
      <div
        className=" w-full sm:w-2/4 lg:w-4/12 xl:w-1/4 bg-white min-h-screen fixed top-0 left-0 z-10 overflow-hidden transition-all ease duration-75 hidden"
        id="sidenav"
      >
        <div className="flex flex-col items-center w-11/12">
          <button className="self-end mx-4 my-4" onClick={closeNav}>
            <i className="fa-solid fa-x fa-2x"></i>
          </button>
          <div className="flex">
            <div className="flex flex-col">
              <input
                type="text"
                className="bg-black outline-none rounded-sm px-2 py-2 text-white"
                placeholder="Enter city name"
                onChange={(e) => setQuery(e.target.value)}
                onClick={() => setShowList(true)}
                value={query}
              />
              {query && showList && (
                <Searchlist searchList={searchList} setQuery={setQuery} />
              )}
            </div>
            <button className="mx-4 my-1 self-start" onClick={addData}>
              <i className="fa-sharp fa-solid fa-plus fa-2x"></i>
            </button>
          </div>

          {arr.map((element, index) => {
            return (
              <div className="flex w-11/12" key={index}>
                <Locationcard
                  cityname={element.cityname}
                  country={element.country}
                  temp={element.temp}
                  weather={element.weather}
                  humidity={element.humidity}
                />
                <button
                  onClick={() => removeData(index)}
                  className="mx-4 text-red-500"
                >
                  <i className="fa-solid fa-trash fa-2x"></i>
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <button className="mx-4 my-4 text-white" onClick={opennav}>
        <i className="fa-sharp fa-solid fa-plus fa-2x"></i>
      </button>
    </>
  );
}
