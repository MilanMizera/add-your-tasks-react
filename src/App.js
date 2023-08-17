import "./App.css"
import Form from "./pages/TasksPage/Form";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/auth/registerPage/Register";
import ErrorPage from "./pages/errorPage/ErrorPage";
import Login from "./pages/auth/loginPage/Login";
import { createContext, useState, useEffect } from "react";




export const ThemeContext = createContext(null)

const App = () => {

  const [theme, setTheme] = useState("dark")

  useEffect(() => {

    return JSON.parse(localStorage.getItem("theme"))

  }, [])


  useEffect(() => {

    localStorage.setItem("theme", JSON.stringify(theme))

  }, [theme])



  const toggleTheme = () => {

    setTheme((curr) => (curr === "light" ? "dark" : "light"))

  }

  return (

    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      <div className="app" id={theme}>
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
