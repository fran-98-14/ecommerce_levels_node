import { Express, Request, Response } from "express";
import { createLevel } from "../domain/level";

export function init(app:Express){
    app.post("/level", postCreateLevel)
}

async function postCreateLevel(req: Request, res: Response){

    try{
        await createLevel(req.body);
        res.sendStatus(200);
    }catch(err){
        console.log(err);
        res.status(400).json(err);
    }
}