import { Express, Request, Response } from "express";
import { deleteLevel as deleteLevelDomain } from "../domain/level";
import { IUserSessionRequest, validateToken } from "../server/validate-token";
import * as error from "../server/error"

export function init(app:Express){
    app.delete("/level", validateToken, deleteLevel)
}

async function deleteLevel(req: IUserSessionRequest, res: Response){

    if(!req.user.user.hasPermission("admin")) return error.handle(res, error.newError(error.ERROR_UNAUTHORIZED, "Unauthorized"));
    if(!req.body.minPoints || isNaN(Number(req.body.minPoints))) return error.handle(res, error.newError(error.ERROR_BAD_REQUEST, "Debe proporcionar un minPoints numérico."))

    try{
        await deleteLevelDomain(req.body.minPoints);
        res.sendStatus(200);
    }catch(err){
        error.handle(res,err)
    }
}