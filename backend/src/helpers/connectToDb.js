const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/RealApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to MongoDb!"))
  .catch((error) => console.error(`could not connect to mongoDb: ${error}`));
