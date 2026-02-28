import express from 'express';

const app = express();

app.listen(3002, () => {
    console.log('Servidor corriendo en https://localhost:3002');
});