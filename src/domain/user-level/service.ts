import { getLevelByPoins } from "../level/service";
import { IUserLevel, UserLevel } from "./user-level";



export async function getUserLevel(userId: string) {
    let userLevel = await UserLevel.findOne({ userId: userId });
    if (userLevel) {
        const totalPoints = await userLevel.getUserValidPoints()
        const level = await getLevelByPoins(totalPoints) //acá está fallando el level
        return {
            userId: userLevel.userId,
            userPoints: userLevel.userPoints,
            totalPoints,
            level
        }
    }
}


export function createUserLevelTest() {
    const userLevels = [
        {
            userId: "fguinazu",
            userPoints: [
                {
                    points: 100,
                    expires: new Date("2023-10-01"),
                },
                {
                    points: 150,
                    expires: new Date("2023-11-15"),
                },
                {
                    points: 75,
                    expires: new Date("2023-09-20"),
                },
                {
                    points: 200,
                    expires: new Date("2024-01-10"),
                },

            ],
        },
        {
            userId: "rcantos",
            userPoints: [
                {
                    points: 75,
                    expires: new Date("2023-09-20"),
                },
                {
                    points: 200,
                    expires: new Date("2024-01-10"),
                },
            ],
        },
    ];

    userLevels.forEach(async u=>{
        console.log(u);
        const created = await UserLevel.create(u);
        created.save();
        console.log(created.userPoints);
    })

}