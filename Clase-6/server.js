import express from "express";

const app = express();

app.use(express.json());

let numbers = [10, 20, 30];

app.get("/numbers", (req, res) => {
    res.status(200).json({numbers});
});

app.get("/numbers/:index", (req, res) => {
    const index = parseInt(req.params.index);
    if (isNaN(index) || index < 0 || index >= numbers.length) {
        return res.status(404).json({error:"Índice no encontrado 404"});
    }
    res.json({ value: numbers[index] });
});

app.listen(3000, () => {
    console.log("Servidor ejecutándose en el puerto 3000");
})