import Grade from '../models/gradeModel';
import User from '../models/userModel';
import Class from '../models/classModel';
import { Schema } from 'mongoose';

export const addGrade = async (studentId: Schema.Types.ObjectId, classId: Schema.Types.ObjectId, name: string, date: Date, grade: number): Promise<any> => {
  const newGrade = new Grade({ studentId, classId, name, date, grade });
  await newGrade.save();

  // Update the student's grades in the class
  await Class.updateOne(
    { 'students.studentId': studentId },
    { $push: { 'students.$.grades': { name, date, grade } } }
  );

  // Update the student's grades array
  const result = await User.updateOne(
    { _id: studentId },
    { $push: { grades: newGrade._id } }
  );
  console.log(`Update result: ${JSON.stringify(result)}`);


  return newGrade;
};

export const updateGrade = async (gradeId: Schema.Types.ObjectId, grade: number): Promise<any> => {
  const updatedGrade = await Grade.findByIdAndUpdate(gradeId, { grade }, { new: true });
  if (!updatedGrade) {
    throw new Error("Grade not found");
  }

  // Update the student's grades in the class
  await Class.updateOne(
    { 'students.grades._id': gradeId },
    { $set: { 'students.$[].grades.$[g].grade': grade } },
    { arrayFilters: [{ 'g._id': gradeId }] }
  );

  return updatedGrade;
};

export const getClassroomStudents = async (classroomId: Schema.Types.ObjectId): Promise<any[]> => {
  const classroom = await Class.findById(classroomId).populate('students.studentId', 'username email');
  if (!classroom) {
    throw new Error("Classroom not found");
  }
  return classroom.students;
};

export const getClassroomAverage = async (classroomId: Schema.Types.ObjectId): Promise<number> => {
  const classroom = await Class.findById(classroomId);
  if (!classroom) {
    throw new Error("Classroom not found");
  }

  const grades = classroom.students.flatMap(student => student.grades.map(g => g.grade));
  const average = grades.reduce((acc, curr) => acc + curr, 0) / grades.length;

  return average;
};

export const getStudentGrade = async (studentId: Schema.Types.ObjectId, gradeId: Schema.Types.ObjectId): Promise<any> => {
  const grade = await Grade.findOne({ _id: gradeId, studentId });
  if (!grade) {
    throw new Error("Grade not found");
  }
  return grade;
};