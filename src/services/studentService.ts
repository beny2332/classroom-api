import Grade from "../models/gradeModel";

export const getGrade = async (id: string) => {
  const grade = await Grade.findById(id);
  return grade
};

export const getAllGrades = async (studentId: string) => {
  const grades = await Grade.find({ studentId });
  return grades
};