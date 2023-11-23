import { Express, Request, Response } from "express";
import { IUserSessionRequest, validateToken } from "../server/validate-token";
import { getUserLevel as getUserLevelServ } from "../domain/user-level/service";

export function init(app: Express){
    app.get("/userlevel", validateToken, getUserLevel)
}


/**
 * @api {get} /userLevel Obtener nivel usuario
 * @apiName Obtener nivel usuario
 * @apiGroup Niveles
 *
 * @apiDescription Obtiene el nivel actual del usuario autenticado.
 *
 *
 * @apiSuccessExample {json} Body
 * {
 *    "userId": "65401eff79049caff4f9531d",
 *    "userPoints": [
 *        {
 *            "points": 150,
 *            "_id": "655c0938d928e31ea6649bf2",
 *            "expires": "2024-11-20T01:34:48.776Z"
 *        },
 *        {
 *            "points": 150,
 *            "_id": "655c09a9d928e31ea6649bf7",
 *            "expires": "2024-11-20T01:36:41.933Z"
 *        },
 *        {
 *            "points": 150,
 *            "_id": "655c09a9d928e31ea6649bfc",
 *            "expires": "2024-11-20T01:36:41.966Z"
 *    ],
 *    "totalPoints": 450,
 *    "level": {
 *        "level": 2,
 *        "minPoints": 300
 *    }
 * }
 *
 * @apiUse Unauthorized
 * @apiUse OtherErrors
 */

function getUserLevel(req: IUserSessionRequest, res: Response){
    getUserLevelServ(req.user.user.id)
    .then(ul=>{
        console.log(ul);
        res.json(ul);
    })
    .catch(err=>{
        res.sendStatus(400);
    })
}