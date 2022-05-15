const express = require("express");
const app = express();
const router = require("./routers");
const cors = require("cors");
const port = 3000

// cors handler
app.use(cors());

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

// start BE server
app.listen(port, () => {
    console.log(`Server listening on Port = ${port}`);
});