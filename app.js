const express = require("express")
const bodyParser = require("body-parser")
const EventEmitter = require('events')
const app = express()
const PORT = 1000
const myEmitter = new EventEmitter()

app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    if (req.method === 'OPTIONS') {
        var headers = {};
        headers["Access-Control-Allow-Origin"] = "*";
        headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
        headers["Access-Control-Allow-Credentials"] = false;
        headers["Access-Control-Max-Age"] = '86400'; // 24 hours
        res.writeHead(200, headers);
        res.end();
    } else {
        next();
    }
});

app.listen(process.env.PORT || PORT, () => console.log(`🚀 Server running on port ${PORT}`))

let trackers = [];

app.get("/:id/onepixel.png", (req, res) => {
    let id = req.params.id;
    trackers.push(id);
    myEmitter.emit('tracker', id);
    var buf = new Buffer.from([
        0x47, 0x49, 0x46, 0x38, 0x39, 0x61, 0x01, 0x00, 0x01, 0x00,
        0x80, 0x00, 0x00, 0xff, 0xff, 0xff, 0x00, 0x00, 0x00, 0x2c,
        0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x01, 0x00, 0x00, 0x02,
        0x02, 0x44, 0x01, 0x00, 0x3b
    ]);
    res.set('Content-Type', 'image/png');
    res.end(buf, 'binary');
});

app.get("/updates", (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    myEmitter.on('tracker', (data) => {
        console.log({
            data
        });
        res.write("data: " + data + '\n\n');
    });
});