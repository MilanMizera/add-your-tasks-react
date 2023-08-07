import Form from "./components/Form";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import ErrorPage from "./components/ErrorPage";

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
