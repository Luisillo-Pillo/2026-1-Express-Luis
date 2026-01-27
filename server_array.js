import http from "http";

let numbers = [10, 20, 30];

const server = http.createServer((req, res) => {
    const {method, url} = req;
    res.setHeader("Content-Type", "application/json");

    
});

server.listen(3000, () => {
    console.log("Servidor escuchando...");
});