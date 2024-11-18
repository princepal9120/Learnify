import { User } from "../models/user.model";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body();
    if (!email || !name || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exist with this email id",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return res.status(201).json({
      success: true,
      message: "Account registered Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to Register",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body();
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All filed are required" });
    }
    const user =await User.findOne({email});
    if(!user){
        return res.status(401).json({
            success: false,
            message: "Incorrect email or password"
        })
    }
    const isPasswordMatch= await bcrypt.match(password, user.password)
    if(!isPasswordMatch){
        return res.status(401).json({
            success: false,
            message: "Incorrect password"
        })
    }
    generateToken(res,user,`Welcome back ${user.name}`)

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to Login",
    });
  }
};
