import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: 'teacher' | 'student';
  classId?: Schema.Types.ObjectId; // For students
  className?: string; // For teachers
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['teacher', 'student'], required: true },
  classId: { type: Schema.Types.ObjectId, ref: 'Class' }, // For students
  className: { type: String } // For teachers
});

const User = model<IUser>('User', userSchema);
export default User;