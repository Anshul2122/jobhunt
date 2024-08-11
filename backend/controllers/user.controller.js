import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
     // console.log(fullname, email, phoneNumber, password, role);
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "fill all feilds",
        success: false,
      });
    }

    const file = req.file;
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    //console.log(cloudResponse.url);

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "user already exists",
        success: false,
      })
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile:{
        profilePhoto:cloudResponse.secure_url,
      }
    });
    
    return res.status(201).json({
      message: "account created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
}
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "password is required",
        success: false,
      });
    }
    //console.log(email, password, role);
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "user not found", success: false });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "invalid password",
        success: false,
      });
    }
    if (role !== user.role) {
      return res.status(400).json({
        message: "account with different roles exists",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id
    }
    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        samesite: "strict",
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", { maxAge: 0 }).json({
      message: "logout success",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const file = req.file;
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    // console.log(fullname, email, phoneNumber, bio, skills);

    let skillsArray;
    if (skills) skillsArray = skills.split(",");
    const userId = req.id; // ye middleware authentication se aayega
    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "user not found",
        success: false,
      });
    }

    if (fullname) user.fullname = fullname
    if (email) user.email = email
    if (phoneNumber) user.phoneNumber = phoneNumber
    if (bio) user.profile.bio = bio
    if (skills) user.profile.skills = skillsArray

    if(cloudResponse){
      user.profile.resume = cloudResponse.secure_url
      user.profile.resumeOriginalName = file.originalname
    }
    //console.log(user.profile.resumeOriginalName);

    await user.save();
    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "profile updated successfully",
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
}
