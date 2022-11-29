require("./helpers/connectToDb");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

const usersRouter = require("./users/routes/routes");
const cardsRouter = require("./cards/routes/routes");

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/api/users", usersRouter);
app.use("/api/cards", cardsRouter);

const PORT = 8000;
app.listen(PORT, () => console.log(`server run on: http://:localhost:${PORT}`));
