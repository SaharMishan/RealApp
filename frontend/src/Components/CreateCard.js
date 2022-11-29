import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Joi from "joi";
const CreateCard = () => {
  const getUserId = JSON.parse(localStorage.getItem("meta-data")).data.user._id;
  const getToken = JSON.parse(localStorage.getItem("meta-data")).data.token;
  const navigate = useNavigate();
  const [userBizCard, setUserBizCard] = useState({
    bizName: "",
    bizDescription: "",
    bizAddress: "",
    bizPhone: "",
    bizImage: "NO IMAGE ADDED BY USER",
    userID: getUserId,
  });

  function validateCreateCardForm(body) {
    const bizCardRules = Joi.object({
      bizName: Joi.string().required().min(3).max(25),
      bizDescription: Joi.string().required().min(10).max(100),
      bizAddress: Joi.string().required().min(10).max(50),
      bizPhone: Joi.string().required().min(9).max(10),
      bizImage: Joi.string(),
      userID: Joi.string().required(),
    });
    return bizCardRules.validate(body);
  }

  const handleChangebizName = (e) => {
    setUserBizCard({
      ...userBizCard,
      bizName: e.target.value,
    });
  };
  const handleChangebizDescription = (e) => {
    setUserBizCard({
      ...userBizCard,
      bizDescription: e.target.value,
    });
  };
  const handleChangebizAddress = (e) => {
    setUserBizCard({
      ...userBizCard,
      bizAddress: e.target.value,
    });
  };
  const handleChangebizPhone = (e) => {
    setUserBizCard({
      ...userBizCard,
      bizPhone: e.target.value,
    });
  };
  const handleChangebizImage = (e) => {
    setUserBizCard({
      ...userBizCard,
      bizImage: e.target.value,
    });
  };

  const hanldeSubmit = async (e) => {
    e.preventDefault();
    const data = { userBizCard };
    const { error } = validateCreateCardForm(data.userBizCard);
    if (error) {
      return toast(error.message);
    }
    console.log(data);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", token: getToken },
      body: JSON.stringify(data.userBizCard),
    };
    try {
      await fetch("http://localhost:8000/api/cards", requestOptions);
      toast("Card created successfully");
      navigate("/myCards");
    } catch (err) {
      toast(err.message);
    }
  };

  return (
    <div className="container ">
      <>
        <h1 className="mt-5">
          Create Card | Real<i className="bi bi-geo-fill"></i>App
        </h1>
        <br />
        <strong className="mt-5 ms-1">
          Make your own bussinnes cards,That's for free!
        </strong>
      </>
      <form
        className="col-md-12"
        noValidate
        autoComplete="off"
        onSubmit={hanldeSubmit}
      >
        <div className="form-floating mt-4">
          <input
            type="text"
            name="bizName"
            onChange={handleChangebizName}
            className="form-control w-25"
            id="floatingInput"
            placeholder="Buissiness Name"
          />
          <label htmlFor="floatingInput name">Buissiness Name</label>
        </div>
        <div className="form-floating mt-4">
          <input
            type="text"
            name="bizDescription"
            onChange={handleChangebizDescription}
            className="form-control w-25"
            id="floatingInput"
            placeholder="Buissiness Description"
          />
          <label htmlFor="floatingInput name">Buissiness Description</label>
        </div>
        <div className="form-floating mt-4">
          <input
            type="text"
            name="bizAddress"
            onChange={handleChangebizAddress}
            className="form-control w-25"
            id="floatingInput"
            placeholder="Buissiness Address"
          />
          <label htmlFor="floatingInput name">Buissiness Address</label>
        </div>
        <div className="form-floating mt-4">
          <input
            type="number"
            name="bizPhone"
            onChange={handleChangebizPhone}
            className="form-control w-25"
            id="floatingInput"
            placeholder="Buissiness Phone Number"
          />
          <label htmlFor="floatingInput name">Buissiness Phone Number</label>
        </div>
        <div className="form-floating mt-4">
          <input
            type="text"
            name="bizImage"
            onChange={handleChangebizImage}
            className="form-control w-25"
            id="floatingInput"
            placeholder="Buissiness Image (Optional Field)"
          />
          <label htmlFor="floatingInput name">
            Buissiness Image (Optional Field)
          </label>
        </div>
        <button className="btn btn-primary mt-4">Create Card</button>
      </form>
    </div>
  );
};

export default CreateCard;
