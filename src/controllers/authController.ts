import { Request, Response, NextFunction } from "express";
import * as authService from "../services/authService";
import Class from "../models/classModel";


export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, email, password, role, className } = req.body;

    const userData = { username, email, password, role, className };
    const newUser = await authService.registerUser(userData);

    // Create a new class if the role is teacher
    if (role === "teacher") {
        const newClass = new Class({ className, teacherId: newUser._id });
        await newClass.save();
        // @ts-ignore
        newUser.classId = newClass._id;
        await newUser.save();
      }
    
       // Add student to class if the role is student
    if (role === "student") {
        const existingClass = await Class.findOne({ className });
        if (!existingClass) {
          res.status(404).json({ message: "Class not found" });
          return;
        }
        existingClass.students.push({
            // @ts-ignore
            studentId: newUser._id,
            name: newUser.username,
            email: newUser.email,
            grades: []
          });
        await existingClass.save();
        // @ts-ignore
        newUser.classId = existingClass._id;
        await newUser.save();
      }

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = await authService.loginUser(req.body.username, req.body.password);
    res.json({ token });
  } catch (error) {
    next(error);
  }
};