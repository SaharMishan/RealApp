const { verfyToken } = require("../users/helpers/token");

function authorizationMiddlware(request, response, next) {
  const tokenFromClient = request.header("token");
  if (!tokenFromClient) {
    return response.status(401).json("Please send token");
  }

  const userData = verfyToken(tokenFromClient);
  if (!userData) {
    return response.status(401).json("Invalid  token can not access user data");
  }

  request.userid = userData._id;

  next();
}

module.exports = authorizationMiddlware;
