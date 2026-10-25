import express, { Application, Request, Response, urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import config from "./config";
import { authRoutes } from "./modules/auth/auth.route";
import { serviceRoutes } from "./modules/services/services.router";
import { categoryRoutes } from "./modules/categories/categories.route";
import { bookingRoutes } from "./modules/bookings/bookings.router";
import { userRoutes } from "./modules/users/users.route";
import { reviewRoutes } from "./modules/reviews/reviews.router";
import { technicianRoutes } from "./modules/technicians/technicians.router";

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

app.use("/api/auth",authRoutes);
app.use("/api/services",serviceRoutes);
app.use("/api/categories",categoryRoutes);
app.use("/api/bookings",bookingRoutes);
app.use("/api/users",userRoutes);
app.use("/api/reviews",reviewRoutes);
app.use("/api/technicians",technicianRoutes);


export default app;
