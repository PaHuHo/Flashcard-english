import mongoose, { Schema,Types,model } from 'mongoose';

export interface ITopic extends mongoose.Document {
  name: string;
  description: string;
  visibility: string;
  user_id:string;
  isActive:number;
  createdAt: Date;
}

const topicSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  visibility: { type: String, enum: ["public", "private"], default: "public"},
  user_id:{type:Types.ObjectId,ref: "User", required: true},// ở đây lưu dạng object để nối với bảng User để lấy dữ liệu từ 'user_id', cú pháp ở đây là ref: "tên model nối đến"
  isActive:{type:Number, default:1, enum: [0,1],}, // 0:No Active, 1:Active
  createAt:{type: Date, default: Date.now},
});

const Topic = model<ITopic>('Topic', topicSchema);

export default Topic;
