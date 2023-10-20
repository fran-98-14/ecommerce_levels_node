import { Express, Request, Response } from "express";
import { IUserSessionRequest, validateToken } from "../server/validate-token";
import { getUserLevel as getUserLevelServ } from "../domain/user-level/service";

export function init(app: Express){
    app.get("/userlevel", validateToken, getUserLevel)
}

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