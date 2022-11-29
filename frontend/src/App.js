import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "./Components/Navbar";
import Home from "./Components/Home";
import About from "./Components/About";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import SignUpBusiness from "./Components/SignUpBusiness";
import MyCards from "./Components/MyCards";
import CreateCard from "./Components/CreateCard";
import PageNotFound from "./Components/PageNotFound";

function App() {
  const [loginUserToken, setLoginUserToken] = useState({});
  const [loginUserDetails, setLoginUserDetails] = useState({});

  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem("meta-data"));
    setLoginUserToken(userToken);
    const userSignUpData = JSON.parse(localStorage.getItem("signUp-Data"));
    setLoginUserDetails(userSignUpData);
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />
        <header>
          <NavBar isLoginUser={loginUserToken} isBizUser={loginUserDetails} />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/signUpBusiness" element={<SignUpBusiness />} />
            <Route path="/myCards" element={<MyCards />} />
            <Route path="/createCard" element={<CreateCard />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
