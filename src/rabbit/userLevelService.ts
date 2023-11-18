import { IRabbitMessage } from "./tools/common";
import { RabbitTopicConsumer } from "./tools/topicConsumer";
import { IPaymentCompletedMessage, addPoints } from "../domain/user-level";

export function init(){
    const levels = new RabbitTopicConsumer('sell_flow','payment_completed');
    levels.addProcessor("payment-completed", processPaymentCompleted)
    levels.init();
}

function processPaymentCompleted(rabbitMessage: IRabbitMessage){
    const payment = rabbitMessage.message as IPaymentCompletedMessage;
    console.log(payment.orderId, " ", payment.totalAmount, "", payment.userId);
    addPoints(payment);
}