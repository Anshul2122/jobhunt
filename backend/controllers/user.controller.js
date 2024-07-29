import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;

    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "fill all feilds",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "user already exists",
        success: false,
      });
    }
    const hashedpassword = await bcrypt.hash(password, 10);

    await user.create({ fullname, email, phoneNumber, hashedpassword, role });
    return res.status(200).json({
      message: "account created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(json());
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "user not found", success: false });
    }
    const isPasswordMatch = bcrypt.hash(password, user.password);
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
      userId: user._id,
    };

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
        message: "login success",
        user,
        success: true,
        token: token,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "login failed" });
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
    return res.status(500).json({ message: "logout failed" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const file = req.file;
    if (!fullname || !email || !phoneNumber || !bio || !skills) {
      return res.status(400).json({
        message: "something went wrong",
        success: false,
      });
    }

    const skillsArray = skills.split(", ");
    const userId = req.id; // ye middleware authentication se aayega
    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "user not found",
        success: false,
      });
    }

    user.fullname = fullname;
    user.email = email;
    user.phoneNumber = phoneNumber;
    user.profile.bio = bio;
    user.skills = skillsArray;

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
    return res.status(500).json({ message: "update profile failed" });
  }
};
