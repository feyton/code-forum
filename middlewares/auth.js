import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();
export function authenticate(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(400).json({
      message: "Missing auth header",
    });
  }
  try {
    const authtoken = req.headers.authorization.split(" ")[1];
    console.log(authtoken);

    jwt.verify(authtoken, process.env.AUTH_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          message: "invalid or expire token",
        });
      }
      next();
    });
  } catch (err) {
    console.log(err);
    res.status(401).json({
      success: false,
      message: "Authentication failed!",
    });
  }
}
