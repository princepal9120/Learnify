import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
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
    const { email, password } = req.body;
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

export const logout= async (req,res) => {
  

  try {

    return res.status(200).cookie("token","",{maxAge:0}).json({
      success: true,
      message:"logout Successfully",
  
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success:false,
      message:"Failed to logout"
    })
  }
  
}
export const getUserProfile= async (req,res) => {
  
  try {
     const userId= req.id
     const user=await User.findById(userId).select("-password").populate(enrolledCourse);
     if(!user){
      return res.status(404).json({
        message: "Profile not found.",
        success: false,
      })
     }
    return res.status(200).json({
      success: true,
      user,
      message:"Profile Created Successfully",
  
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success:false,
      message:"Failed to create Profile"
    })
  }
  
}
export const updateProfile =async (req,res) => {
  try {
    const userId= req.id
    const {name}= req.body
    const profilePhoto=req.file;
    const user= await User.findById(userId);
    if(!user){
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }


  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success:false,
      message:"Failed to Update Profile"
    })
  }
}
