import { Schema, model, Document } from 'mongoose';

interface IGrade extends Document {
  studentId: Schema.Types.ObjectId;
  classId: Schema.Types.ObjectId;
  name: string;
  date: Date;
  grade: number;
}

const gradeSchema = new Schema<IGrade>({
  studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  classId: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
  name: { type: String, required: true },
  date: { type: Date, required: true },
  grade: { type: Number, required: true }
});

const Grade = model<IGrade>('Grade', gradeSchema);
export default Grade;