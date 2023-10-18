import * as mongoose from "mongoose"

export interface IMinPoints{
    minPoints: number
}

const minPointsSchema = new mongoose.Schema<IMinPoints>({
    minPoints: {
        type: Number,
        required: [true, "Debe ingresar los puntos para el nivel."],
        min:[0,"Los puntos para el nivel deben ser mayor a 0."],
    }
});

export const MinPoints = mongoose.model<IMinPoints>("level", minPointsSchema)