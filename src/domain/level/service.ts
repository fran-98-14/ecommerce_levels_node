import { MinPoints, IMinPoints } from "./minPoints";
import * as error from "../../server/error"

export interface ILevel{
    level: number;
    minPoints: number;
}

/*
    Podría haber sido solo un number pero si luego tiene más 
    parámetros de entrada ya tengo la interfaz creada.
*/
interface ILevelRequest{
    minPoints?: number
}

export function createLevel(newLevel: ILevelRequest):Promise<void>{
    return new Promise(async (res, rej)=>{

        if(!newLevel.minPoints || isNaN(Number(newLevel.minPoints)) || newLevel.minPoints<= 0) 
        return rej("minPoints debe ser numérico mayor a 0.");

        const newMinPoints = <IMinPoints>(new MinPoints());
        newMinPoints.minPoints = newLevel.minPoints;

        const allMinPoints = await MinPoints.find({minPoints: newMinPoints.minPoints}).exec();

        if(allMinPoints.length>0) return rej("Ya existe un nivel para esta cantidad de puntos.");

        const createdMinPoints = await MinPoints.create(newMinPoints);
        createdMinPoints.save()
            .then(d=>{
                res();
            }).catch(err=>{
                rej(err);
            });
        
    });
}

export function getLevels(): Promise<Array<ILevel>>{
    return new Promise(async (res, rej)=>{
        const lminPoints = await MinPoints.find({}).sort()
        lminPoints.sort((a,b)=>a.minPoints-b.minPoints)
        const levels: Array<ILevel> = new Array<ILevel>();
        let i = 1;
        lminPoints.forEach(m=>{
            const level: ILevel = {
                level: i,
                minPoints: m.minPoints
            }
            levels.push(level);
            i++;
        })
        res(levels);
    });
}

export function getLevelByPoins(points: number): Promise<ILevel>{
    return new Promise(async (res,rej)=>{
        const levels = (await getLevels()).filter(x=>x.minPoints<= points);
        if(!levels) return rej(0)
        res(levels.at(levels.length));
        
    })
}

export async function deleteLevel(points: number): Promise<void>{
    
    return new Promise(async (res, rej)=>{
        const result = await MinPoints.deleteMany({minPoints:points})
        if(result.deletedCount == 0) return rej(error.newError(error.ERROR_NOT_FOUND, "No se encontró el nivel."))
        res();
    });

}