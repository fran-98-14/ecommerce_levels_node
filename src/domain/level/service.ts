import { MinPoints, IMinPoints } from "./minPoints";

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
    return new Promise((res,rej)=>{
        MinPoints.find({},(err: any, levels: Array<IMinPoints>)=>{

        })
    })
}