import mongoose from "mongoose";
const {Schema} = mongoose;
import { getConfig } from "../../server/environment";

export interface IUserLevel{
    userId: string,
    points: IUserPoints[]
}

export interface IUserPoints{
    points: number,
    expires: Date
}

const userPointsSchema = new Schema({
    points: Number, 
    expires: {type: Date, default: getExpireDate}
})

const userLevelSchema = new Schema({
    userId: String,
    userPoints: [userPointsSchema]
},{
    methods:{
        getUserValidPoints(): number{
            let points: number = 0;
            this.userPoints.forEach(p=>{
                if(p.expires > new Date()) points += p.points;
            })

            return points;
        }
    }
})

export const UserLevel = mongoose.model("UserLevel", userLevelSchema)

function getExpireDate(): Date{
    const date = new Date();
    date.setDate( date.getDate() + getConfig(process.env).daysToExpirePoints)
    return date;
}