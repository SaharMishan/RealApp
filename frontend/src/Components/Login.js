import { useState } from "react";
import { toast } from "react-toastify";
import Joi from "joi";
const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const validateSignIn = (body) => {
    const signInRules = Joi.object({
      email: Joi.string()
        .min(6)
        .max(255)
        .required()
        .email({ tlds: { abortEarly: false } }),
      password: Joi.string().min(6).max(1024).required(),
    });
    return signInRules.validate(body);
  };

  const handleChangeEmail = (e) => {
    setUserData({
      ...userData,
      email: e.target.value,
    });
  };
  const handleChangePassword = (e) => {
    setUserData({
      ...userData,
      password: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { userData };
    const { error } = validateSignIn(data.userData);
    if (error) {
      return toast(error.message);
    }
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data.userData),
    };
    try {
      const res = await fetch(
        "http://localhost:8000/api/users/signin",
        requestOptions
      );

      const dataFromUser = await res.json();
      localStorage.setItem("meta-data", JSON.stringify(dataFromUser));
      window.location.replace("/home");
      toast("Welcome to RealApp " + data.userData.email);
    } catch (err) {
      toast("Invalid Email Or Password");
    }
  };

  return (
    <div className="container ">
      <>
        <h1 className="mt-5">
          Sign In | Real<i className="bi bi-geo-fill"></i>App
        </h1>
      </>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <div className="form-floating mt-4 ">
          <input
            type="email"
            name="email"
            onChange={handleChangeEmail}
            className="form-control w-25"
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating mt-4">
          <input
            type="password"
            name="password"
            onChange={handleChangePassword}
            className="form-control w-25"
            id="floatingPassword"
            placeholder="Password"
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <button type="submit" className="btn btn-primary mt-4">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
