const User = require("../model/User");

const handleLogout = async (req, res) => {
  // On client, also delete the access token

  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(204); //204 - No Content. There is no content to send for this request

  const refreshToken = cookies.jwt;

  // Is refresh token present in db
  const foundUser = await User.findOne({ refreshToken });
  console.log(
    "🚀 ~ file: logoutController.js:13 ~ handleLogout ~ foundUser:",
    foundUser
  );

  // If refresh token present in db but there is no user associated to it
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true });
    return res.sendStatus(204);
  }

  // Delete refresh token in db
  foundUser.refreshToken = "";
  const result = await foundUser.save();

  // secure:true - only serves on https
  res.clearCookie("jwt", { httpOnly: true, secure: true, sameSite: "None" });
  res.sendStatus(204);
};

module.exports = { handleLogout };
