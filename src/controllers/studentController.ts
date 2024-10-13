import { Request, Response } from "express";
import * as studentService from "../services/studentService";

export const getGrade = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const grade = await studentService.getGrade(id);
    if (!grade) {
      res.status(404).json({ message: "Grade not found" });
      return;
    }
    res.status(200).json(grade);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllGrades = async (req: Request, res: Response): Promise<void> => {
  try {
    const { studentId } = req.params;
    const grades = await studentService.getAllGrades(studentId);
    res.status(200).json(grades);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
