require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const { User } = require("./models/models");
const cors = require("cors");
const router = require("./routes/index");
const errorHandler = require("./middleware/ErrorHandlingMiddleware");

const PORT = process.env.PORT || 9000;

const app = express();
app.use(cors());
app.use(express.json());
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
