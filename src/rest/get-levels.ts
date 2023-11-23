import {Express, Request, Response} from "express"
import { getLevels as getLevelsService } from "../domain/level";

export function init(app: Express){
    app.get("/levels", getLevels);
}



/**
 * @api {get} /levels Obtener niveles
 * @apiName Obtener niveles
 * @apiGroup Niveles
 *
 * @apiDescription Obtiene los niveles creados hasta el momento.
 *
 *
 * @apiSuccessExample {json} Body
 * [
 *     {
 *         "level": 1,
 *         "minPoints": 200
 *     },
 *     {
 *         "level": 2,
 *         "minPoints": 600
 *     }
 * ]
 *
 * @apiUse OtherErrors
 */

async function getLevels(req: Request, res: Response){
    try{
        const levels = await getLevelsService();
        res.json(levels);
    }catch(err:any){
        console.log(err);
        res.status(400).json(err);
    }
}