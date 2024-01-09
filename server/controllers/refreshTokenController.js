require("dotenv").config();
const fsPromises = require("fs").promises
const path = require("path")
const jwt = require("jsonwebtoken");
let usersDB = require("../DB/users.json")
const mutatingUserDB = (data)=> usersDB = data


const handleRefreshToken = (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt )
    return res.sendStatus(401) ;
 const refreshToken = cookies.jwt;
 res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true })
 const existingdUser = usersDB.find(
    (user) => user.refreshToken === refreshToken
  );

//   to avoide a hacker using the refresh token to create another access token
  if (!existingdUser){
    jwt.verify(
        refreshToken, 
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded)=>{
            if(err) res.sendStatus(403)
            const hackedUser = usersDB.forEach((hackeduser)=>{
                if(hackeduser.username === decoded.username){
                    hackeduser.refreshToken = ""
                }
            })
            fsPromises.writeFile(path.join(__dirname, "..", "DB", "users.json"), JSON.stringify(usersDB))
        }
    )
    return res.sendStatus(401);
  } 

  jwt.verify(
    refreshToken, 
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded)=>{
        if(err || decoded.username !== existingdUser.username) return res.sendStatus(403);
        const accessToken = jwt.sign(
            { "username": decoded.username },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "10m" }
        )
        res.json({ accessToken })
    }
    )
};

module.exports = { handleRefreshToken };
