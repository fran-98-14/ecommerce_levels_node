import * as postCreateLevel from "./post-create-level"
import * as getLevels from "./get-levels"
import {Express} from "express"
import * as deleteLevel from "./delete-level"
import * as getUserLevel from "./get-user-level"

export function init(app: Express){
    postCreateLevel.init(app);
    getLevels.init(app);
    deleteLevel.init(app);
    getUserLevel.init(app);

}