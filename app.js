require('dotenv').config();
let http = require('http');
const PORT = process.env.PORT || 3000;
let fs = require('fs');
let userRoutes = require("./modules/user/routes/user.routes");

const {createTables} = require("./database/createTables");


let httpServer = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    
    // Static files
    if(req.url.match(/^[/]uploads(.*)/)) {
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
    // Modules Routes
    userRoutes(req, res);
});

httpServer.listen(PORT, () => {
    createTables();
    console.log(`Server is running at port ${PORT}...`);
});