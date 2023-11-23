import { Express, Request, Response } from "express";
import { deleteLevel as deleteLevelDomain } from "../domain/level";
import { IUserSessionRequest, validateToken } from "../server/validate-token";
import * as error from "../server/error"

export function init(app:Express){
    app.delete("/level", validateToken, deleteLevel)
}

/**
 * @api {delete} /level Eliminar un nivel 
 * @apiName Eliminar nivel
 * @apiGroup Niveles
 *
 * @apiDescription Elimina un nivel dado un minPoints determinado
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
 * @apiErrorExample 404 Not Found 
 *     HTTP/1.1 404 Not Found
 *      {
 *          "error": {
 *              "code": 404,
 *              "error": "No se encontró el nivel."
 *          }
 *      }
 * @apiErrorExample 400 Bad Request
 *  HTTP/1.1 400 Bad Request
 * {
 *  "error": {
 *       "code": 400,
 *       "error": "Debe proporcionar un minPoints numérico."
 *   }
 * }
 */

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