import { emitLevelUp } from "../../rabbit/levelUpService";
import { getLevels } from "../level";
import { createUserLevel, getUserLevel } from "./service"
import { UserLevel } from "./user-level";



export interface IPaymentCompletedMessage{
    orderId :string
    userId :string
    totalAmount :number
}


export async function addPoints(payment: IPaymentCompletedMessage){

    const levels = await getLevels();
    const actualLevel = (await getUserLevel(payment.userId)).level.level;
    await createUserLevel(payment.userId, payment.totalAmount);
    const newLevel = (await getUserLevel(payment.userId)).level.level;

    console.log(">>> Nivel actual: ", actualLevel, " >>> Nuevo nivel: ", newLevel)

    if(newLevel>actualLevel){
        const points = (await UserLevel.findOne({userId: payment.userId})).getUserValidPoints();
        const nextLevel = levels.find(l=>l.level == newLevel+1)
        let nextLevelPoints = 0;
        if(nextLevel){
            nextLevelPoints = nextLevel.minPoints - points;
        }
        emitLevelUp(
            payment.userId, 
            newLevel,
            points,
            nextLevelPoints
            )
    }
}