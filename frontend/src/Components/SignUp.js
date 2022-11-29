import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signUpValidation } from "../Helper/SignUpValidate";

const SignUp = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState({
    name: "",
    email: "",
    password: "",
    biz: false,
  });

  const handleChangeName = (e) => {
    setUsers({
      ...users,
      name: e.target.value,
    });
  };
  const handleChangeEmail = (e) => {
    setUsers({
      ...users,
      email: e.target.value,
    });
  };
  const handleChangePassword = (e) => {
    setUsers({
      ...users,
      password: e.target.value,
    });
  };

  const hanldeSubmit = async (e) => {
    e.preventDefault();

    const data = { users };
    const { error } = signUpValidation(data.users);
    if (error) {
      return toast(error.message);
    }
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data.users),
    };
    try {
      const res = await fetch(
        "http://localhost:8000/api/users/signUp",
        requestOptions
      );
      if (res.ok) {
        const signUpData = await res.json();
        localStorage.setItem("signUp-Data", JSON.stringify(signUpData));
        toast("Hey " + data.users.name + " ,Your account created successfully");
        navigate("/login");
      } else {
        toast("User already exist");
      }
    } catch (err) {
      toast(err.message);
    }
  };

  return (
    <div className="container ">
      <>
        <h1 className="mt-5">
          Sign Up Form | Real<i className="bi bi-geo-fill"></i>App
        </h1>
      </>

      <form noValidate autoComplete="off" onSubmit={hanldeSubmit}>
        <div className="form-floating mt-4">
          <input
            type="text"
            name="name"
            className="form-control w-25"
            onChange={handleChangeName}
            id="floatingInput"
            placeholder="Full Name"
          />
          <label htmlFor="floatingInput name">Full Name</label>
        </div>
        <div className="form-floating mt-4 ">
          <input
            type="email"
            name="email"
            onChange={handleChangeEmail}
            className="form-control w-25"
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label htmlFor="floatingInput email">Email address</label>
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
        <button className="btn btn-primary mt-4">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
