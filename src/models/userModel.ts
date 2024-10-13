import { Schema, model, Document } from 'mongoose';
import {IGrade, gradeSchema} from './gradeModel';
interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: 'teacher' | 'student';
  classId?: Schema.Types.ObjectId; // For students
  className?: string; // For teachers
  grades?: IGrade[]
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['teacher', 'student'], required: true },
  classId: { type: Schema.Types.ObjectId, ref: 'Class' }, // For students
  className: { type: String }, // For teachers
  grades: [gradeSchema] // For students
});

const User = model<IUser>('User', userSchema);
export default User;