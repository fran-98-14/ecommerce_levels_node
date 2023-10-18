import {Express, Request, Response} from "express"
import { getLevels as getLevelsService } from "../domain/level";

export function init(app: Express){
    app.get("/levels",getLevels);
}

async function getLevels(req: Request, res: Response){
    try{
        const levels = await getLevelsService();
        res.json(levels);
    }catch(err:any){
        console.log(err);
        res.status(400).json(err);
    }
}