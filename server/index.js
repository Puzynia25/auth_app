require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const cors = require("cors");
const router = require("./routes/index");
const errorHandler = require("./middleware/ErrorHandlingMiddleware");
const checkStatusMiddleWare = require("./middleware/checkStatusMiddleWare");

const PORT = process.env.PORT || 9000;

const app = express();

app.use(
    cors({
        origin: ["*"],
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);
app.use(express.json());
app.use(checkStatusMiddleWare);
app.use("/api", router);

//tha last middleware:
app.use(errorHandler);

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`Server started on the port ${PORT}`));
    } catch (err) {
        console.log(err);
    }
};
start();
