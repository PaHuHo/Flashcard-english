import { Request, Response } from 'express';
import Flashcard from '../models/flashcard.model';


export const showFlashcard = async (req: Request, res: Response) => {

    
    let query: any = {status:"approve", topic_id: req.query.topic_id };

    if(req.query.status=="pending"){
        query.status=req.query.status
    }
    const data= await Flashcard.find(query).populate("user_id", "username");
    // user_id là field trong Topic
    // "username" là các field muốn lấy từ User
    // nhớ phải có cú pháp ref:"tên model" trong model 
    const dataFlashcard={
        data,
        count:data.length
    }
    console.log(dataFlashcard)
    res.status(200).json({
        message: "Load data successfully",
        data: dataFlashcard
    });
}

export const createFlashcard = async (req: Request, res: Response) => {

    console.log(req.body)
    const flashcard = new Flashcard({
        topic_id:req.body.topic_id,
        front: req.body.front,
        back: req.body.back,
        status:req.body.status||"approve",
        user_id: req.body.user_id
    })

    await flashcard.save();
    res.status(201).json({
        message:req.body.status=="Pending"?"Thanks for your contribute ideas": "New Flashcard is successfully",
    });
}