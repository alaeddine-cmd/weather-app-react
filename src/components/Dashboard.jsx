import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { FaSearch } from "react-icons/fa";
import "../styles/Dashboard.css";

function Dashboard() {
  const [inputLocation, setInputLocation] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState({});


  useEffect(() => {
    if (!location) {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const coords = `${pos.coords.latitude},${pos.coords.longitude}`;
            console.log("Using browser location:", coords);
            setLocation(coords);
          },
          (err) => {
            console.warn("Geolocation failed:", err.message || err);
            setLocation("Tunisia");
          },
          {
            timeout: 10000,
            maximumAge: 60000,
            enableHighAccuracy: true,
          }
        );
      } else {
        console.warn("Geolocation is not supported by this browser.");
        setLocation("Tunisia");
      }
    }
  }, []);

  useEffect(() => {
    if (!location) return;

    async function fetchForecast() {
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=c989385a32a446cdbb7231205250605&q=${location}&days=5`
        );

        const data = await response.json();
        setLoading(true);

        if (data.error) {
          alert(data.error.message);
          return;
        }
        setWeather(data);
        setLoading(false);
        const weatherCondition = data.current?.condition?.text.toLowerCase();

        let weatherTheme = "";
        if (weatherCondition.includes("sunny")) {
          weatherTheme = "sunny";
        } else if (
          weatherCondition.includes("rain") ||
          weatherCondition.includes("drizzle")
        ) {
          weatherTheme = "rainy";
        } else if (
          weatherCondition.includes("windy") ||
          weatherCondition.includes("storm")
        ) {
          weatherTheme = "windy";
        } else {
          weatherTheme = "sunny";
        }

        document.documentElement.setAttribute("weather-theme", weatherTheme);
      } catch (error) {
        console.error("Error fetching weather:", error);
      }
    }
    fetchForecast();
  }, [location]);

  const handleInputChange = (e) => {
    setInputLocation(e.target.value);
  };

  const addLocation = (e) => {
    e.preventDefault();
    if (inputLocation.trim() === "") return;
    setLocation(inputLocation.trim()); // trigger the API fetch
  };

  return (
    <div className="container">
      <form className="search-box" onSubmit={addLocation}>
        <button type="submit" className="search-icon">
          <FaSearch />
        </button>
        <input
          type="text"
          value={inputLocation}
          onChange={handleInputChange}
          placeholder="Enter a city name ..."
        />
      </form>

      {loading ? (
        <h2 className="loading">Loading weather data...</h2>
      ) : (
        <div className="card-container">
          <img
            src={
              weather.current?.condition?.icon
                ? `https:${weather.current.condition.icon}`
                : sunny
            }
            id="card-image"
            alt="weather-icon"
          />
          <h1 id="location-title">{weather.location?.name || "No location"}</h1>
          <h1 id="location-temp">
            {weather.current?.temp_c ? `${weather.current.temp_c}°C` : "--"}
          </h1>
          <h3 id="location-condition">
            {weather.current?.condition?.text || "--"}
          </h3>
          <h5 id="location-hum">
            Humidity: {weather.current?.humidity || "--"}%
          </h5>
          <h5 id="location-wind">
            Wind: {weather.current?.wind_kph || "--"} km/h
          </h5>

          <div className="forecast-container">
            {weather.forecast?.forecastday?.slice(1).map((day) => (
              <div className="forecast" key={day.date}>
                <p>
                  {new Date(day.date).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <img
                  src={day.day.condition.icon}
                  id="forecast-image"
                  alt="weather-icon"
                />
                <b>
                  <span style={{color: "green"}}>{day.day.mintemp_c}°C</span>  <span style={{color: "red"}}>{day.day.maxtemp_c}°C</span>
                </b>{" "}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
