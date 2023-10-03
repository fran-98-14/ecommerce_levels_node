import { Request, Response } from "express";
import * as express from "express";

const app = express()

app.get("/", (req: Request, res: Response)=>{
    res.send("Hello world");
});

app.listen(3000,()=>{console.log("Listening on 3000")})