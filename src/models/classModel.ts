import { Schema, model, Document } from 'mongoose';

interface IGrade {
  name: string;
  date: Date;
  grade: number;
}

interface IStudent {
  studentId: Schema.Types.ObjectId;
  name: string;
  email: string;
  grades: IGrade[];
}

interface IClass extends Document {
  className: string;
  teacherId: Schema.Types.ObjectId;
  students: IStudent[];
}

const gradeSchema = new Schema<IGrade>({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  grade: { type: Number, required: true }
});

const studentSchema = new Schema<IStudent>({
  studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  grades: [gradeSchema]
});

const classSchema = new Schema<IClass>({
  className: { type: String, required: true, unique: true },
  teacherId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  students: [studentSchema]
});

const Class = model<IClass>('Class', classSchema);
export default Class;