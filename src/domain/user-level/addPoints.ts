import { createUserLevel } from "./service"



export interface IPaymentCompletedMessage{
    orderId :string
    userId :string
    totalAmount :number
}


export function addPoints(payment: IPaymentCompletedMessage){
    createUserLevel(payment.userId, payment.totalAmount);
}