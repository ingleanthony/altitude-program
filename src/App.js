import { useEffect, useState } from "react";
import "./App.css";
import { useTheme } from "./context/ThemeContext";
import Sun from "./components/Sun";
import Moon from "./components/Moon";
import Footer from "./components/Footer";

function App() {
  const { theme, colors } = useTheme();
  const [values, setValues] = useState({
    // weight: undefined,
    altitude: undefined,
    // area: undefined,
    temperature: 0,
    pressure: 0,
    density: 0,
  });

  useEffect(() => {
    getDensity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.altitude]);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const getDensity = () => {
    const altitude = values.altitude;
    let temperature, pressure, density;
    if (!altitude | (altitude === 0)) {
      temperature = pressure = density = 0;
    } else if (altitude < 11000) {
      temperature = 15.04 - 0.00649 * altitude;
      pressure = 101.29 * Math.pow((temperature + 273.1) / 288.08, 5.256);
    } else if (altitude < 25000) {
      temperature = -56.46;
      pressure = 22.65 * Math.pow(Math.E, 1.73 - 0.000157 * altitude);
    } else {
      temperature = -131.21 + 0.00209 * altitude;
      pressure = 2.488 * Math.pow((temperature + 273.1) / 216.6, -11.388);
    }
    density = pressure / (0.2869 * (temperature + 273.1));
    setValues({ ...values, temperature, pressure, density });
  };

  return (
    <div className="App">
      <div className="themeRow">{theme === "light" ? <Sun /> : <Moon />}</div>
      <header>
        <h1>Rocket Calculator</h1>
      </header>
      <main className="grid">
        <h2>Density</h2>
        <p className="caption">
          Based on the{" "}
          <a
            href="https://www.grc.nasa.gov/www/k-12/airplane/atmosmet.html"
            target="_blank"
            rel="noreferrer"
          >
            NASA Earth Atmosphere Model
          </a>
        </p>
        {/* <div>
        <label>Weight (kg)</label>
        <input name="weight" onChange={onChange} value={values.weight} />
      </div> */}
        <label>Altitude (m)</label>
        <input name="altitude" onChange={onChange} value={values.altitude} />
        {/* <div>
        <label>Characteristic Surface Area</label>
        <input name="area" onChange={onChange} value={values.area} />
      </div> */}
        <h3>Results</h3>
        <label>Temperature (ºC)</label>
        <input
          name="temperature"
          onChange={onChange}
          value={values.temperature}
        />
        <label>Pressure (K-PA)</label>
        <input name="pressure" onChange={onChange} value={values.pressure} />
        <label>
          Density (kg/m<sup>3</sup>)
        </label>
        <input name="density" onChange={onChange} value={values.density} />

        <style>{`
        body,
        html {
          background-color: ${colors.background};
          color: ${colors.text};
        }
        input {
          background-color: ${colors.foreground};
          color: ${colors.text};
        }
        h1 {
          color: ${colors.primary};
        }
        .caption {
          color: ${colors.caption}
        }
        a {
          color: ${colors.link}
        }
      `}</style>
      </main>
      <Footer />
    </div>
  );
}

export default App;
