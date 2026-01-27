import http from "http";

let numbers = [10, 20, 30];

const server = http.createServer((req, res) => {
    const {method, url} = req;
    res.setHeader("Content-Type", "application/json");

    if (url.startsWith("/numbers")) { //    http://localhost:3000/numbers
        const parts = url.split("/"); //    /numbers/2 = ["", "numbers", 2]
        const index = parts.length > 2 ? parseInt(parts[2]) : null;
        switch (method) {
            case "GET":
                if (index === null || isNaN(index)) {
                    res.statusCode = 200;
                    res.end(JSON.stringify({ numbers }));
                }
                break;

            default:
                break;
        };
    };
});

server.listen(3000, () => {
    console.log("Servidor escuchando...");
});