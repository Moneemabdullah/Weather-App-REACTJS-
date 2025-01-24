import React, { useEffect, useRef, useState } from "react";
import "./Weather.css";
import scarch_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import dizzle_icon from "../assets/dizzle.png";
import humidity_icon from "../assets/humidity.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";

const Weather = () => {
  const inputRef = useRef();
  const [weatherDeta, setWeatherDeta] = useState(false);
  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": dizzle_icon,
    "03n": cloud_icon,
    "04d": rain_icon,
    "04n": rain_icon,
    "09d": wind_icon,
    "10d": dizzle_icon,
    "10n": snow_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const search = async (city) => {
    if (city === "") {
      alart("Enetr City Name!");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;

      const response = await fetch(url);
      const deta = await response.json;

      if (!response.ok) {
        alart(data.message);
        return;
      }

      console.log(deta);
      const icon = allIcons[data.Weather[0].icon] || clear_icon;
      setWeatherDeta({
        humidity: data.main,
        humidity,
        windSpeed: data.wind.speed,
        temprature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      setWeatherDeta(false);
      console.error("Error fatching weather deta!");
    }
    useEffect(() => {
      search("London");
    }, []);
  };

  return (
    <div className="weather">
      <div className="scarch-bar">
        <input ref={inputRef} type="text" placeholder="search" />
        <img
          src={scarch_icon}
          alt="S"
          onClick={() => search(inputRef.current.value)}
        />
      </div>
      {weatherDeta ? (
        <>
          <img src={weatherDeta.icon} alt="" className="wearhet-icon" />
          <p className="tempr">{weatherDeta.temp}°c</p>
          <p className="cityname">{weatherDeta.city}</p>
          <div className="weather-deta">
            <div className="col">
              <img src={humidity_icon} alt="" />
              <dir>
                <p>{weatherDeta.humidity} %</p>
                <span>Humidity</span>
              </dir>
            </div>
            <div className="col">
              <img src={wind_icon_icon} alt="" />
              <dir>
                <p>{weatherDeta.windSpeed} Km/h</p>
                <span>Wind Speed</span>
              </dir>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Weather;
