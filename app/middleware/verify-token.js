const jwt = require("jsonwebtoken");
const appConfig = require("../../config/app");
module.exports = (req, res, next) => {
  const bearerToken = req.header("authorization");

  if (!bearerToken) return res.status(401).send("Access Denied");

  const token = bearerToken.split(" ")[1];

  if (!token) return res.status(401).send("Access Denied");

  try {
    const verified = jwt.verify(token, appConfig.key);
    next();
  } catch (err) {
    return res.status(400).send("Invalid Token");
  }
};
