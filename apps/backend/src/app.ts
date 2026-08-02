import express, { type Express } from "express";
const app: Express = express();

app.use(express.json());

app.get("/", (_, res) => {

    res.json({
        message: "URL Shortener API"
    });

});

export default app;