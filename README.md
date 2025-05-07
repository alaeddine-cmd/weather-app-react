# 🌤️ React Weather Dashboard App (Vite + Yarn)

A modern, responsive **Weather Dashboard** built with **React**, **Vite** and the **Context API**.  
Features include automatic geolocation lookup, city search, current conditions + 4-day forecast, and a dynamic weather-based theme using CSS variables.

---

## ✨ Features

- 🌎 **Automatic Geolocation**: Detects your location on page load (with fallback)  
- 🔎 **City Search**: Look up any city by name  
- ☀️🌧️🌬️ **Current Conditions**: Temperature, humidity, wind, and condition text/icon  
- 📅 **4-Day Forecast**: Min/max temperatures and daily weather icons  
- 🎨 **Dynamic Theme**: Light/Dark/“Sunny”/“Rainy”/“Windy” color schemes driven by CSS variables  
- 💾 **Persistent Preference**: Remembers last-searched city & theme in `localStorage`  
- ⚡️ **Fast HMR** with Vite  

---

## 🧰 Tech Stack

- **React** (with Hooks & Context API)  
- **Vite** for lightning-fast dev & build  
- **Context API** for theme management  
- **CSS Variables** for theming & multi-directional glow shadows  
- **WeatherAPI.com** for real-time and forecast data  
- **Geolocation API** for automatic location detection  
- **localStorage** for persistence  
- **Yarn** as package manager  

---

## 🗂️ Project Structure
```plaintext
src/
├── components/
│ └── Dashboard.jsx #
├── context/
│ └── ThemeContext.jsx
├── styles/
│ └── Dashboard.css
│ └── themes.css
├── App.jsx 
└── main.jsx
```
---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/alaeddine-cmd/weather-app-react
cd weather-app-react

```

### 2. Install Dependencies

```bash
yarn
```

### 3. Run the App

```bash
yarn dev
```

### 4. Build for Production

```bash
yarn build
```


## 🌐 Live Demo

👉 [Click here to view the live app](https://weather-app-react-qkaz.onrender.com)

---
