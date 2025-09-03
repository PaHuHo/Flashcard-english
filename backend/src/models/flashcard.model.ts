import mongoose, { Schema,Types,model } from 'mongoose';

export interface IFlashcard extends mongoose.Document {
    topic_id:Types.ObjectId;
    front: string;
    back: string;
    status: string;
    user_id:Types.ObjectId;
    createdAt: Date;
}

const flashcardSchema = new Schema({
  topic_id: { type:Types.ObjectId,ref:"Topic", required: true },
  front: { type: String, required: true },
  back: { type: String, required: true },
  status: { type: String, enum: ["pending", "approve"], default: "approve"},
  user_id:{type:Types.ObjectId,ref: "User", required: true},// ở đây lưu dạng object để nối với bảng User để lấy dữ liệu từ 'user_id', cú pháp ở đây là ref: "tên model nối đến"
  createAt:{type: Date, default: Date.now},
});

const Flashcard = model<IFlashcard>('Flashcard', flashcardSchema);

export default Flashcard;
