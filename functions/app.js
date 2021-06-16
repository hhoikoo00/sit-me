// library imports
const express = require("express");
const cors = require("cors");
const app = express();
require("express-async-errors"); // no need for try/catch for error

// module imports
const middleware = require("./utils/middleware");
const loginRouter = require("./controllers/login");
const bookingRouter = require("./controllers/booking");
const areaRouter = require("./controllers/area");
const utilRouter = require("./controllers/utils");

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/login", loginRouter);
app.use("/booking", bookingRouter);
app.use("/area", areaRouter);
app.use("/util", utilRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
