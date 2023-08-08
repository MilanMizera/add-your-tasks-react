import Form from "./pages/TasksPage/Form";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/registerPage/Register";
import Login from "./pages/loginPage/Login";
import ErrorPage from "./pages/errorPage/ErrorPage";

function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={ <Form /> } />
      <Route path="/prihlaseni" element={ <Login /> } />
      <Route path="/registrace" element={ <Register /> } />
      <Route path="*" element={<ErrorPage/>} />
    </Routes>
  </BrowserRouter>

}

export default App;
