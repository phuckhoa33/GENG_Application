import express from "express";
import dotenv from "dotenv";
import cors from "cors";

export const middleware = () => {
    const app = express();
    dotenv.config()
    app.use(express.json({ limit: "30mb", extended: true }));
    app.use(express.urlencoded({ limit: "30mb", extended: true }));
    app.use(cors());
    return app;
}