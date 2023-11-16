import { IRabbitMessage } from "./tools/common";
import { RabbitTopicConsumer } from "./tools/topicConsumer";
import { IPaymentCompletedMessage } from "../domain/user-level";

export function init(){
    const levels = new RabbitTopicConsumer('','order','payment_completed');
    levels.addProcessor("consumePaymentCompleted", processPaymentCompleted)
}

function processPaymentCompleted(rabbitMessage: IRabbitMessage){
    const payment = rabbitMessage.message as IPaymentCompletedMessage;

}