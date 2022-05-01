import { User } from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"


// create a new user
export const createUser = async (req, res) => {
    const email = req.body.email;
  
    const existingUser = await User.findOne({ email: email });
  
    if (existingUser) {
      return res.status(409).json({
        success: false,
        data: { message: "A user with this email already exist" },
      });
    }
  
    try {
      // hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      const Obj = new User({
        firstName: req.body.firstName,
        secondName: req.body.secondName,
        email: req.body.email,
        password: hashedPassword,
      });
      const user = await User.create(Obj);
      res.status(201).json({ success: true, data :{message: "account successfully created"} });
    } catch (error) {
      console.log(error);
  
      res.status(404).json({
        success: false,
        data: { message: error.properties },
      });
    }
  };
  

  
// login a user
export const loginUser = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
  
    const user = await User.findOne({ email: email });
  
    if (!user) {
      return res.status(400).json({
        success: false,
        data: { message: "No user with this email exists" },
      });
    }
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        data: { message: "Incorrect password" },
      });
    }
  
    // generating token
    let token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.AUTH_KEY,
      { expiresIn: "100h" }
    );
  
    // send json response
    return res.status(200).json({
      success: true,
      data: {message: "successfully logged in",
            email: req.body.email},
      authtoken: token,
    });
  };
  