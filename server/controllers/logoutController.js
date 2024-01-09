const fsPromise = require("fs").promises;
const path = require("path");
let usersDB = require("../DB/users.json");
const mutatingUserDB = (data) => (usersDB = data);

const logoutExistingUser = async (req, res) => {
  const cookies = req.cookies;
  const userData = req.body;

  console.log(cookies)

  if (!cookies?.jwt) return res.status(204).json({message: "user logged out"});

  console.log(userData)

  const refreshToken = cookies.jwt;
  const existingdUser = usersDB.find(
    (user) => user.refreshToken === refreshToken
  );
  if (!existingdUser) {
    res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    return res.status(204).json({message: "user logged out"});
  }
  const otherUsers = usersDB.filter(
    (user) => user.refreshToken !== existingdUser.refreshToken
  );
  const currentUser = { ...existingdUser, refreshToken: "", loggedIn: false };
  mutatingUserDB([...otherUsers, currentUser]);
  console.log(currentUser)

  await fsPromise.writeFile(
    path.join(__dirname, "..", "DB", "users.json"),
    JSON.stringify(usersDB)
  );
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true }); //in production, you should set 'secure: true'
  res.status(204).json({message: "user logged out"});
};

module.exports = { logoutExistingUser }
