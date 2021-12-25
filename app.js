require('dotenv').config();
let http = require('http');
const PORT = process.env.PORT || 3000;
let fs = require('fs');
let userRoutes = require("./modules/user/routes/user.routes");

const { createTables } = require("./database/createTables");


let httpServer = http.createServer(async (req, res) => {
    //CORS POLICY
    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS, POST, GET, PUT, DELETE, PATCH",
        "Access-Control-Allow-Headers": "*",
        "Content-Type": "application/json"
    };

    if (req.method === "OPTIONS") {
        res.writeHead(204, headers);
        res.end();
        return;
    }

    if (["GET", "POST", "PUT", "DELETE"].indexOf(req.method) > -1) {
        res.writeHead(200, headers);

        // Modules Routes
        userRoutes(req, res);

        // Static files
        if (req.url.match(/^[/]uploads(.*)/)) {
            fs.readFile(__dirname + req.url, (err, data) => {
                if (err) {
                    res.writeHead(404);
                    res.end(JSON.stringify({ status: 404, message: "Please enter correct file path" }));
                    return;
                }
                res.writeHead(200);
                res.end(data);
            });
        }
        return;
    }
});

httpServer.listen(PORT, () => {
    createTables();
    console.log(`Server is running at port ${PORT}...`);
});
