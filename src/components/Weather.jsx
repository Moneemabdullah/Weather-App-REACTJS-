import { useEffect, useRef, useState } from "react";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import humidity_icon from "../assets/humidity.png";
import rain_icon from "../assets/rain.png";
import scarch_icon from "../assets/search.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";

import "./weather.css"; // import the stylesheet

const Weather = () => {
    const inputRef = useRef();
    const [weatherDeta, setWeatherDeta] = useState(null);

    const allIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": drizzle_icon,
        "03n": cloud_icon,
        "04d": rain_icon,
        "04n": rain_icon,
        "09d": wind_icon,
        "10d": drizzle_icon,
        "10n": snow_icon,
        "13d": snow_icon,
        "13n": snow_icon,
    };

    const search = async (city) => {
        if (city === "") {
            alert("Enter City Name!");
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${
                import.meta.env.VITE_APP_ID
            }`;

            const response = await fetch(url);
            const data = await response.json();

            if (!response.ok) {
                alert(data.message);
                return;
            }

            const icon = allIcons[data.weather[0].icon] || clear_icon;
            setWeatherDeta({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp - 273.15),
                location: data.name,
                icon: icon,
            });
        } catch (error) {
            setWeatherDeta(null);
            console.error("Error fetching weather data!", error);
        }
    };

    useEffect(() => {
        search("London");
    }, []);

    return (
        <div className="weather-container">
            <div className="weather-card">
                <div className="search-bar">
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Enter city name"
                        className="search-input"
                    />
                    <button
                        type="button"
                        onClick={() => search(inputRef.current.value)}
                        aria-label="Search weather by city"
                        className="search-button"
                    >
                        <img
                            src={scarch_icon}
                            alt="Search"
                            className="search-icon"
                        />
                    </button>
                </div>

                {weatherDeta ? (
                    <div className="weather-info fade-in">
                        <div className="weather-main">
                            <img
                                src={weatherDeta.icon}
                                alt="Weather Icon"
                                className="weather-icon"
                            />
                            <p className="temperature">
                                {weatherDeta.temperature}°C
                            </p>
                            <p className="location">{weatherDeta.location}</p>
                        </div>

                        <div className="weather-details">
                            <div className="detail-item">
                                <img
                                    src={humidity_icon}
                                    alt="Humidity"
                                    className="detail-icon"
                                />
                                <div>
                                    <p className="detail-value">
                                        {weatherDeta.humidity} %
                                    </p>
                                    <span className="detail-label">
                                        Humidity
                                    </span>
                                </div>
                            </div>
                            <div className="detail-item">
                                <img
                                    src={wind_icon}
                                    alt="Wind"
                                    className="detail-icon"
                                />
                                <div>
                                    <p className="detail-value">
                                        {weatherDeta.windSpeed} Km/h
                                    </p>
                                    <span className="detail-label">
                                        Wind Speed
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="loading-text">Loading weather data...</p>
                )}
            </div>
        </div>
    );
};

export default Weather;
