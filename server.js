import http from "http";

const server = http.createServer((req, res) => {});

server.listen(3000, () => {
    console.log("Servidor está ejecutándose en el puerto 3000")
}); 