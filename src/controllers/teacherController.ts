import { Request, Response } from "express";
import * as teacherService from "../services/teacherService";

export const addGrade = async (req: Request, res: Response): Promise<void> => {
  try {
    const { studentId, classId, name, date, grade } = req.body;
    const result = await teacherService.addGrade(studentId, classId, name, date, grade);
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateGrade = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { grade } = req.body;
    const { ObjectId } = require('mongodb');
    const result = await teacherService.updateGrade(new ObjectId(id), grade);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getClassroomStudents = async (req: Request, res: Response): Promise<void> => {
  try {
    const { classroomId } = req.params;
    const { ObjectId } = require('mongodb');
    const students = await teacherService.getClassroomStudents(new ObjectId(classroomId));
    res.status(200).json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getClassroomAverage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { classroomId } = req.params;
    const { ObjectId } = require('mongodb');
    const average = await teacherService.getClassroomAverage(new ObjectId(classroomId));
    res.status(200).json(average);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getStudentGrade = async (req: Request, res: Response): Promise<void> => {
  try {
    const { studentId, gradeId } = req.params;
    const { ObjectId } = require('mongodb');
    const grade = await teacherService.getStudentGrade(new ObjectId(studentId), new ObjectId(gradeId));
    res.status(200).json(grade);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};