import mongoose, { Int32 } from 'mongoose';

export interface IUser extends mongoose.Document {
  username: string;
  email: string;
  password: string;
  role:number;
  createdAt: Date;
  isActive:number
}

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role:{type:Number, default:0}, // 0:Admin, 1:Teacher, 2:Student
  isActive:{type:Number, default:1}, // 0:No Active, 1:Active
  createAt:{type: Date, default: Date.now},
});

const User = mongoose.model<IUser>('User', userSchema);

// Collection (bảng) users được tạo tự động khi bạn gọi mongoose.model('User', userSchema) và thao tác CRUD lần đầu với nó.
// mongoose.model('User', ...) tạo một Model có tên là 'User'.
// Mongoose sẽ tự động chuyển tên model thành chữ thường và số nhiều
// Khi bạn dùng model User lần đầu để lưu, tìm hoặc thao tác, MongoDB sẽ tự động tạo collection users nếu chưa có.
// Nếu muốn custom tên collection: const userSchema = new mongoose.Schema({...}, { collection: '<custom collection name' });

export default User;
