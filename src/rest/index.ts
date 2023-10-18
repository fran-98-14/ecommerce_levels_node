import * as postCreateLevel from "./post-create-level"
import * as getLevels from "./get-levels"
import {Express} from "express"

export function init(app: Express){
    postCreateLevel.init(app);
    getLevels.init(app);

}