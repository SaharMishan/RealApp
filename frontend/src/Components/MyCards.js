import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MyCards = () => {
  const Navigate = useNavigate();
  const getToken = JSON.parse(localStorage.getItem("meta-data")).data.token;
  const getUserID = JSON.parse(localStorage.getItem("meta-data")).data.user._id;
  const [cardData, setCardData] = useState([]);
  const [reload, setReload] = useState(0);

  const handleRemoveCard = async (card) => {
    const selectedCard = { card };
    const requestOptions = {
      method: "DELETE",
      headers: { token: getToken },
      cardID: card._id,
      userID: getUserID,
    };
    try {
      await fetch(
        `http://localhost:8000/api/cards/${card._id}`,
        requestOptions
      );
      setCardData(selectedCard);
      toast("Card Deleted Successfully");
      setReload((state) => (state += 1));
    } catch (err) {
      toast(err.message);
    }
  };
  useEffect(() => {
    const getCardData = async () => {
      try {
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: getToken,
          },
        };
        const userCards = await fetch(
          "http://localhost:8000/api/cards",
          requestOptions
        );
        const cards = await userCards.json();
        setCardData(cards);
      } catch (err) {
        toast(err.message);
      }
    };
    getCardData();
  }, [reload]);

  return (
    <div className="mt-5 container">
      <h1 className="ms-4">
        My Cards | Real<i className="bi bi-geo-fill"></i>App -{" "}
        <button
          className="btn btn-primary"
          onClick={() => {
            Navigate("/createCard");
          }}
        >
          Create new card
        </button>
      </h1>
      <div className="bizCards d-flex row-cols-4 flex-wrap ms-3 ">
        {!cardData.length ? (
          <h3 className="mt-5 ms-4 ">No Bussiness Cards yet...</h3>
        ) : (
          cardData.map((card) => {
            return (
              <div
                key={card.bizDescription}
                className="card  mt-4 me-2"
                style={{ width: "18rem" }}
              >
                <>
                  <img
                    src={card.bizImage}
                    className="card-img-top"
                    alt={card.bizName}
                    style={{ width: "18rem" }}
                  />
                </>
                <div className="card-body mt-2">
                  <h3 className="card-title">{card.bizName}</h3>
                  <p className="card-text">{card.bizDescription}</p>
                  <p className="card-text">{card.bizAddress}</p>
                  <p className="card-text">{card.bizPhone}</p>
                </div>
                <>
                  <div className="mb-3 ms-3">
                    <button
                      className="btn btn-primary "
                      onClick={() => handleRemoveCard(card)}
                    >
                      Remove Card
                    </button>
                  </div>
                </>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default MyCards;
