// library imports
const express = require("express");
const app = express();
require("express-async-errors"); // no need for try/catch for error

// module imports
const samplesRouter = require("./controllers/samples");
const middleware = require("./utils/middleware");

app.use(express.json());
app.use(middleware.requestLogger);

app.use("/", samplesRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
