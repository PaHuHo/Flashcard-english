import { Request, Response } from 'express';
import Flashcard from '../models/flashcard.model';


export const showFlashcard = async (req: Request, res: Response) => {


    let query: any = { status: "approve", topic_id: req.query.topic_id };

    if (req.query.status == "pending") {
        query.status = req.query.status
    }
    const data = await Flashcard.find(query).populate("user_id", "username");
    // user_id là field trong Topic
    // "username" là các field muốn lấy từ User
    // nhớ phải có cú pháp ref:"tên model" trong model 
    const dataFlashcard = {
        data,
        count: data.length
    }
    console.log(dataFlashcard)
    res.status(200).json({
        message: "Load data successfully",
        data: dataFlashcard
    });
}

export const createFlashcard = async (req: Request, res: Response) => {


    const flashcard = new Flashcard({
        topic_id: req.body.topic_id,
        front: req.body.front,
        back: req.body.back,
        status: req.body.status || "approve",
        user_id: req.body.user_id
    })

    await flashcard.save();
    res.status(201).json({
        message: req.body.status == "Pending" ? "Thanks for your contribute ideas" : "New Flashcard is successfully",
    });
}
export const updateFlashcard = async (req: Request, res: Response) => {
    try {
        const { id, status } = req.body

        const flashcard = await Flashcard.findByIdAndUpdate(
            id,
            {status:status}
        )

        if (!flashcard) {
            res.status(404).json({
                message: "Flashcard not found",
            });
        }

        res.status(201).json({
            message: "Success",
        });
    } catch (error){
        res.status(500).json({
            message: "Internal server error",
            error,
        });
    }

}

export const deleteFlashcard = async (req: Request, res: Response) => {
    try {
        const { id } = req.body

        const flashcard = await Flashcard.findByIdAndDelete(id)

       if (!flashcard) {
            res.status(404).json({
                message: "Flashcard not found",
            });
        }

        res.sendStatus(204)
    } catch (error){
        res.status(500).json({
            message: "Internal server error",
            error,
        });
    }

}