import * as express from "express";
import * as routes from "./rest";
import * as cors from "cors";
import { Config, getConfig } from "./server/environment";
import * as mongoose from "mongoose";
import * as bodyParser from "body-parser"

// Variables de entorno
const conf: Config = getConfig(process.env);

mongoose.connect(conf.mongoDb)
    .then(value=>{console.log(`Connected to Mongo.`)})
    .catch(err=>{
        console.log(err);
        process.exit();
    })

const app = express();

app.use(cors({    
    origin: true,
    optionsSuccessStatus: 200,
    credentials: true
}));

app.use(bodyParser.json());

routes.init(app);

app.listen(conf.port,()=>{console.log(`Listening on port ${conf.port}`)})