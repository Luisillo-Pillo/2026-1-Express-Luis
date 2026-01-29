import express from "express";

const app = express();

app.use(express.json());

let numbers = [10, 20, 30];

app.get("/numbers", (req, res) => {
    res.status(200).json({numbers});
});