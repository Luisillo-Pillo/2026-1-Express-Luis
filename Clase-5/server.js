import http from "http";

const server = http.createServer((req, res) => {
    const {method, url} = req;

    res.setHeader("Content-Type", "application/json")

    if(url === "/"){
        switch (method) {
            case "GET":
                res.statusCode = 200;
                res.end(JSON.stringify({message:"GET Recurso obtenido con éxito (200)"}));
                break;

            case "POST":
                res.statusCode = 201;
                res.end(JSON.stringify({message:"POST Recurso creado (201)"}));
                break;

            case "Put":
                res.statusCode = 200;
                res.end(JSON.stringify({message:"PUT Recurso actualizado (200)"}));
                break;

            case "DELETE":
                res.statusCode = 204;
                res.end(JSON.stringify({message:"DELETE Recurso eliminado (204)"}));
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