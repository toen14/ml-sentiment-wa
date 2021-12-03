require('dotenv').config({ path: __dirname + "/../.env" })
import express from "express";

import { client } from "./wa-client";
import { port, secret } from "./config/env";

const app = express();

client.initialize();

app.set("view engine", "ejs");

app.get("/data", (req, res) => {
   
    if (req.query.secret != secret) {
        return res.status(403).end();
    }

    return res.render(__dirname + "/views/index.ejs", {
        text: req.query.text
    })
})

app.listen(port, () => {
    console.info("Server running on port: " + port)
})