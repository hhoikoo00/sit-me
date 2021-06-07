// library imports
const express = require("express");
const cors = require("cors");
const app = express();
require("express-async-errors"); // no need for try/catch for error

// module imports
const middleware = require("./utils/middleware");
const samplesRouter = require("./controllers/samples");
const loginRouter = require("./controllers/login");

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/dbsamples", samplesRouter);
app.use("/login", loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
