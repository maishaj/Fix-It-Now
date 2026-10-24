import express, { Application, Request, Response, urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import config from "./config";

const app:Application=express();

// Built in Middlewares

app.use(cors({
   origin:config.app_url,
   credentials:true
}))

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.get("/",async(req:Request,res:Response)=>{
    res.send("Hello World");
})


export default app;