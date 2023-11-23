import { IRabbitMessage } from "./tools/common";
import { RabbitTopicConsumer } from "./tools/topicConsumer";
import { IPaymentCompletedMessage, addPoints } from "../domain/user-level";

export function init(){
    const levels = new RabbitTopicConsumer('sell_flow','payment_completed');
    levels.addProcessor("payment-completed", processPaymentCompleted)
    levels.init();
}


/**
 * @api {topic} exchange: sell_flow, topic: payment_completed
 * @apiGroup RabbitMQ GET
 *
 * @apiDescription Escucha desde order cuando se completa un pago.
 *
 * @apiSuccessExample {json} Mensaje
 *     {
 *        "type": "payment-completed",
 *        "message": {
 *             orderId: '655eaa1a9655b46c6049b193',
 *             userId: '65401eff79049caff4f9531d',
 *             totalAmount: 150
 *         }
 *     }
 */

function processPaymentCompleted(rabbitMessage: IRabbitMessage){
    const payment = rabbitMessage.message as IPaymentCompletedMessage;
    console.log(payment.orderId, " ", payment.totalAmount, "", payment.userId);
    addPoints(payment);
}
