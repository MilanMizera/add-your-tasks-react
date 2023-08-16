import "./App.css"
import Form from "./pages/TasksPage/Form";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/auth/registerPage/Register";
import ErrorPage from "./pages/errorPage/ErrorPage";
import Login from "./pages/auth/loginPage/Login";
import { createContext, useState } from "react";
import ReactSwitch from "react-switch";



export const ThemeContext = createContext(null)

const App = () => {


  const [theme, setTheme] = useState("dark")

  const toggleTheme = () => {

    setTheme((curr) => (curr === "light" ? "dark" : "light"))

  }

  return (

    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="app" id={theme}>
        <div className="switch">
          <label> {theme === "light" ? "Light Mode" : "Dark Mode"}</label>
          <ReactSwitch onChange={toggleTheme} checked={theme === "dark"} />
        </div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Form />} />
            <Route path="/prihlaseni" element={<Login />} />
            <Route path="/registrace" element={<Register />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeContext.Provider>
  )
}

export default App;
