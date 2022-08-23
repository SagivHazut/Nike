require("./middlewares/connectToDb");
const express = require("express");
const app = express();
const usersRouter = require("./Routes/Users/userRouter");
const cardsRouter = require("./Routes/Cards/cardsRouter");
const transactions = require("./Routes/Transactions/transactionsRouter");
const restPassword = require("./Routes/resetPassword");
const payments = require("./Routes/thanksYouMsg");

const chalk = require("chalk");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

app.use(morgan(chalk.cyan(":method :url :status :response-time ms")));
app.use(cors());
app.use(express.json());
app.use("/api/users", usersRouter);
app.use("/api/cards", cardsRouter);
app.use("/api/transactions", transactions);
app.use("/", restPassword);
app.use("/", payments);

const PORT = process.env.PORT || 8181;
app.listen(PORT, () =>
  console.log(chalk.blueBright.bold(`server run on: http://:localhost:${PORT}`))
);
