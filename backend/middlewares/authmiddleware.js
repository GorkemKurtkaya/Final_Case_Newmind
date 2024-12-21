import User from "../models/usermodel.js";
import jwt from "jsonwebtoken";


// Kullanıcı kontrolü
const checkUser = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.userId);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};


// Token kontrolü
const authenticateToken = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
        if (err) {
          console.log(err.message);
          return res.status(401).send("Access denied");
        } else {
          const user = await User.findById(decodedToken.userId);
          if (!user) {
            return res.status(401).send("User not found");
          }
          req.user = user;
          next();
        }
      });
    } else {
      res.status(401).send("Access denied");
    }
  } catch (error) {
    res.status(401).send("Access denied");
  }
};






export { authenticateToken, checkUser };
