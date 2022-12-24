require("dotenv").config();
const config = require("./config/config");
const dbConnection = require("./config/database");

const itemRoute = require("./routes/item");
const userRoute = require("./routes/user");
const cartRoute = require("./routes/cart");
const app = require("express")();

dbConnection()
  .then(() => {
    require("./config/express")(app);

    //require('./config/routes')(app);
    app.use(function (err, req, res, next) {
      res.status(500).send(err.message);
    });

    app.use("/", itemRoute);
    app.use("/", userRoute);
    app.use("/", cartRoute);
    app.listen(config.port, console.log(`Listening on port ${config.port}!`));
  })
  .catch(console.error);
