import { Express, Request, Response } from "express";
import { createLevel } from "../domain/level";
import { IUserSessionRequest, validateToken } from "../server/validate-token";
import { ISession, User } from "../token";
import * as error from "../server/error"

export function init(app:Express){
    app.post("/level", validateToken, postCreateLevel)
}

async function postCreateLevel(req: IUserSessionRequest, res: Response){

    if(!req.user.user.hasPermission("admin"))
        return error.handle(res, error.newError(error.ERROR_UNAUTHORIZED, "Unauthorized"));
    
    console.log("Permisos admin ok: Crear nivel")
    
    try{
        await createLevel(req.body);
        res.sendStatus(200);
    }catch(err){
        console.log(err);
        res.status(400).json(err);
    }
}