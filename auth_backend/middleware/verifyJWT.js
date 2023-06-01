const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  // taking out authorization header which includes bearer token
  const authHeader = req.headers.authorization || req.headers.Authorization;
  /**
   * 401 - Unauthorized
   * Client must authenticate itself to get the requested response
   */
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);

  const token = authHeader.split(" ")[1];
  // verifying access token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    /**
     * 403 - Forbidden
     * The client does not have access rights to the content. It is unauthorized
     */
    if (err) return res.sendStatus(403);
    req.user = decoded.UserInfo.username;
    req.roles = decoded.UserInfo.roles;
    next();
  });
};

module.exports = verifyJWT;
