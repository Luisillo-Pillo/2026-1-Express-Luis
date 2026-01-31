import express from "express";
import colors from "colors";

const app = express();

let tasks = [
    {
        id: 1,
        desc: "Estudiar",
        status: "done"
    },
    {
        id: 2,
        desc: "Leer",
        status: "done"
    },
    {
        id: 3,
        desc: "Estudiar",
        status: "done"
    },
    {
        id: 4,
        desc: "Leer",
        status: "done"
    },
    {
        id: 5,
        desc: "Estudiar",
        status: "done"
    },
    {
        id: 6,
        desc: "Leer",
        status: "done"
    }
];

app.get('/', (req, res) => {
    res.json({message: 'Holaaa'})
});

app.get("/api/tasks", (req, res) => {
    res.status(200).json(tasks);
});

app.get('/aoi/tasks/:id', (req, res) => {
    const id = req.params.id;

    let task = null;

    for (let i = 0; i < tasks.length; i++) {
        if (tasks [i].id === id) {
            task = tasks[i];
            break;
        };
    };

    if (!task) {
        return res.status(404).json({error: "Tarea no encontrada"});
    };

    res.status(200).json(taks);
})

app.listen(3000, () => {
    console.log(colors.cyan(`Aplicación en http://localhost:3000`));
});