import { Request, Response } from 'express';
import Topic from '../models/topic.model'

export const show = async (req: Request, res: Response) => {
    console.log(req.query.userId)

    let query: any = { isActive: 1 };

    if(req.query.userId){
        query.user_id=req.query.userId
    }else{
        query.visibility="public"
    }
    const dataTopic = await Topic.find(query).populate("user_id", "username");
    // user_id là field trong Topic
    // "username" là các field muốn lấy từ User
    // nhớ phải có cú pháp ref:"tên model" trong model 

    res.status(201).json({
        message: "Load data successfully",
        data: dataTopic
    });
}

export const create = async (req: Request, res: Response) => {

    console.log(req.body)
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

export const update = async (req: Request, res: Response) => {
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
export const remove = async (req: Request, res: Response) => {
    const topic = await Topic.findOne({ _id: req.body.topic_id });

    if (!topic) {
        return res.status(400).json({ message: "Can't find topic to delete" });
    }
    topic.isActive = 0;

    topic?.save()
    res.status(201).json({
        message: "Delete successfully",
    });
}