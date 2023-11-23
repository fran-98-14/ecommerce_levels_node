import { Express, Request, Response } from "express";
import { createLevel } from "../domain/level";
import { IUserSessionRequest, validateToken } from "../server/validate-token";
import { ISession, User } from "../token";
import * as error from "../server/error"

export function init(app:Express){
    app.post("/level", validateToken, postCreateLevel)
}


/**
 * @api {post} /level Crear nivel
 * @apiName Crear nivel
 * @apiGroup Niveles
 *
 * @apiDescription Crea un nuevo nivel por medio de los puntos mínimos asignados.
 *
 * @apiExample {json} Body
 *    {
 *      "minPoints": "{minPoints}",
 *    }
 *
 * @apiSuccessExample {string} Body
 *    HTTP/1.1 200 Ok
 *
 * @apiUse Unauthorized
 * @apiUse OtherErrors
 * @apiErrorExample 400 Bad Request
 *  HTTP/1.1 400 Bad Request
 * "minPoints debe ser numérico mayor a 0."
 */
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