import { Link, NavLink } from "react-router-dom";
import {
  BsBagPlusFill,
  BsCardImage,
  BsHouseDoorFill,
  BsInfoSquareFill,
  BsPlusSquareFill,
  BsFillPersonPlusFill,
} from "react-icons/bs";
import { ImExit } from "react-icons/im";

const Navbar = ({ isLoginUser, isBizUser }) => {
  return (
    <nav
      className="navbar navbar-expand-sm navbar-light bg-light shadow-sm"
      aria-label="Third navbar example"
    >
      <div className="container">
        <Link className="navbar-brand" to="home">
          Real<i className="bi bi-geo-fill"></i>App
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsExample03"
          aria-controls="navbarsExample03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExample03">
          <ul className="navbar-nav me-auto mb-2 mb-sm-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="home">
                <BsHouseDoorFill /> Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="about">
                <BsInfoSquareFill /> About
              </NavLink>
            </li>

            {isLoginUser == null && isBizUser == null ? null : (
              <li className="nav-item">
                <NavLink className="nav-link" to="myCards">
                  <BsCardImage /> My Cards
                </NavLink>
              </li>
            )}
            {isLoginUser == null && isBizUser == null ? null : (
              <li className="nav-item">
                <NavLink className="nav-link" to="createCard">
                  <BsPlusSquareFill /> Create Card
                </NavLink>
              </li>
            )}
          </ul>

          <ul className="navbar-nav ms-auto mb-2 mb-sm-0">
            {isLoginUser == null ? null : (
              <li
                className="nav-item"
                onClick={() => {
                  localStorage.removeItem("meta-data");
                  localStorage.removeItem("signUp-Data");
                  window.location.replace("/login");
                }}
              >
                <NavLink className="nav-link" to="login">
                  <ImExit /> Sign Out
                </NavLink>
              </li>
            )}
            <>
              <li className="nav-item">
                <NavLink className="nav-link" to="login">
                  <i className="bi bi-geo-fill"></i> Sign In
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="signUp">
                  <BsFillPersonPlusFill /> Sign Up
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="signUpBusiness">
                  <BsBagPlusFill /> Sign Up Bussiness
                </NavLink>
              </li>
            </>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
