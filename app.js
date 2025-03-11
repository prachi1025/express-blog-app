import express from "express";
import bodyParser from "body-parser";

import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

import blogRoutes from "./routes/blog.js";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: false}));
// app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", "views");

app.use(blogRoutes);

app.listen(port , () => {
    console.log(`listening on port: ${port}`);
});