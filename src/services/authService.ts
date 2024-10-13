import User from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const registerUser = async (userData: any) => {
  const { username, email, password, role, className, classId } = userData;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, email, password: hashedPassword, role, className, classId });
  await newUser.save();
  return newUser;
};

export const loginUser = async (username: string, password: string) => {
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid credentials");
  }
  const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: "1h" });
  return token;
};