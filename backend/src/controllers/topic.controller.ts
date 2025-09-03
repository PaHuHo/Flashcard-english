import { Request, Response } from 'express';
import Topic from '../models/topic.model'
import { Types } from "mongoose";

export const showTopic = async (req: Request, res: Response) => {

    let match: any = { isActive: 1 };
    
    if (req.query.user_id) {
        match.user_id = new Types.ObjectId(req.query.user_id as string);
    } else {
        match.visibility = "public"
    }
    // const topics = await Topic.find(match).populate("user_id", "username");
    // user_id là field trong Topic
    // "username" là các field muốn lấy từ User
    // nhớ phải có cú pháp ref:"tên model" trong model 
    const topics = await Topic.aggregate([
        { $match: match },//dùng match để lọc Topic theo match trên 
        {
            $lookup: {
                from: "flashcards",
                localField: "_id",
                foreignField: "topic_id",
                as: "flashcards",
                pipeline: [
                    { $match: { status: "approve" } } // lọc flashcard bên trong lookup
                ]
            }
        },
        {
            $addFields: {
                flashcardCount: { $size: "$flashcards" }
            }
        },
        {
            $project: {
                flashcards: 0 // ẩn chi tiết flashcard, chỉ giữ lại count
            }
        }
    ]);

    // populate user_id sau khi aggregate
    await Topic.populate(topics, { path: "user_id", select: "_id username" });

    res.status(200).json({
        message: "Load data successfully",
        data: topics
    });
}
export const detailTopic = async (req: Request, res: Response) => {

    console.log(req.query.topic_id)
    const dataTopic = await Topic.findById(req.query.topic_id).populate("user_id", "username");


    // const dataTopic = {
    //   ...topic?.toObject(), // toObject() để chỉ lấy ra object trong topic nếu không để thì nó sẽ trải cả những property "ngầm" của document ($__, $isNew, _doc…), nên object bị lộn xộn
    //   countFlashcard: dataFlashCard.length
    // };
    return res.status(201).json({
        message: "Load data successfully",
        data: dataTopic,
    });
}
export const createTopic = async (req: Request, res: Response) => {

    const topic = new Topic({
        name: req.body.name,
        description: req.body.description,
        visibility: req.body.visibility,
        user_id: req.body.user_id
    })

    await topic.save();
    res.status(201).json({
        message: "New topic is successfully",
    });
}

export const updateTopic = async (req: Request, res: Response) => {
    const { topic_id, visibility } = req.body;
    const topic = await Topic.findOne({ _id: topic_id });

    if (!topic) {
        return res.status(400).json({ message: "Can't find topic to update" });
    }
    topic.visibility = visibility;

    topic?.save()
    res.status(201).json({
        message: "Update successfully",
    });
}
export const removeTopic = async (req: Request, res: Response) => {
    const topic = await Topic.findOne({ _id: req.body.topic_id });

    if (!topic) {
        return res.status(400).json({ message: "Can't find topic to delete" });
    }
    topic.isActive = 0;
    topic?.save()

    res.status(204).json({
        message: "Delete successfully",
    });
}