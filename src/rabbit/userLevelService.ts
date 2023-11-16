import { IRabbitMessage } from "./tools/common";
import { RabbitTopicConsumer } from "./tools/topicConsumer";

interface IPaymentCompletedMessage{
    orderId :string
    userId :string
    totalAmount :number
}

export function init(){
    const levels = new RabbitTopicConsumer('','order','payment_completed');
    levels.addProcessor("consumePaymentCompleted", processPaymentCompleted)
}

function processPaymentCompleted(rabbitMessage: IRabbitMessage){

}