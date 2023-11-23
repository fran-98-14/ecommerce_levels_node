import { IRabbitMessage } from "./tools/common";
import { sendMessage } from "./tools/fanoutEmitter";




/**
 * @api {fanout} levels/levelUp Usuario subió de nivel
 * @apiGroup RabbitMQ POST
 *
 * @apiDescription levels emite un fanout notificando que un usuario subió de nivel con su última compra.
 *
 * @apiExample {json} Mensaje
 *     {
 *        "type": "level-up",
 *         "message": {
 *             "userId": "{userId}",
 *             "level": "{level}",
 *             "points": "{points}",
 *             "pointsNextLevel": "{pointsNextLevel}"
 *        }
 *     }
 */
/**
 * Enviá una petición a catalog para validar si un articulo puede incluirse en el cart.
 */
export function emitLevelUp(userId: string, level: number, points: number, pointsNextLevel: number){
    const message : IRabbitMessage = {
        type: "level-up",
        message: {
            userId,
            level,
            points,
            pointsNextLevel
        }
    }
    sendMessage(message);
}