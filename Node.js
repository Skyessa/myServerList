const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.json());

app.get("/servers", (req, res) => {
    const data = fs.readFileSync("servers.json", "utf8");
    res.send(JSON.parse(data));
});

app.post("/register", (req, res) => {
    const servers = JSON.parse(fs.readFileSync("servers.json", "utf8"));
    servers.push(req.body); // gelen server bilgisi ekleniyor
    fs.writeFileSync("servers.json", JSON.stringify(servers, null, 2));
    res.send({ ok: true });
});

app.post("/clear", (req, res) => {
    fs.writeFileSync("servers.json", "[]");
    res.send({ ok: true });
});

app.listen(3000);
