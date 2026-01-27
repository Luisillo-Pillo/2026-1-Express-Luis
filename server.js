import http from "http";

const server = http.createServer((req, res) => {
    const {method, url} = req;

    res.setHeader("Content-Type", "application/json")

    if(url === "/"){
        switch (method) {
            case "GET":
                res.statusCode = 200;
                res.end(JSON.stringify({message:"GET Recurso obtenido con éxito (200 OK"}));
                break;

            default:
                res.statusCode = 405;
                res.end(JSON.stringify({error:"Método no permitido (405)"}));
                break;
        }
    } else {
        res.statusCode = 404;
        res.end(JSON.stringify({error: "Ruta no encontrada (404)"}));
    }
});

server.listen(3000, () => {
    console.log("Servidor está ejecutándose en el puerto 3000")
});