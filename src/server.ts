import * as express from "express";
import * as routes from "./rest";
import * as cors from "cors";
import { Config, getConfig } from "./server/environment";
import * as mongoose from "mongoose";
import * as bodyParser from "body-parser"
import * as logout from "./rabbit/logoutService";
import * as processPayment from "./rabbit/userLevelService";
import { createUserLevelTest } from "./domain/user-level/service";
import path = require("path");

// Variables de entorno
const conf: Config = getConfig(process.env);

mongoose.connect(conf.mongoDb)
    .then(value=>{
        //createUserLevelTest();
        console.log(`Connected to Mongo.`)
    })
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

app.use(
express.static(path.join(__dirname, "./public"), { maxAge: 31557600000 })
);
app.get("/", (req, res, next) => { res.redirect("index.html"); });

routes.init(app);

processPayment.init();
logout.init();

app.listen(conf.port,()=>{console.log(`Listening on port ${conf.port}`)})