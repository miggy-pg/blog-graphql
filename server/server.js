require("dotenv").config();

const express = require("express");
const models = require("./models");
const expressGraphQL = require("express-graphql").graphqlHTTP;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const schema = require("./schema/schema");
const app = express();
const path = require("path");

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  throw new Error("You must provide a Mongo Atlas URI");
}

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI);
mongoose.connection
  .once("open", () => console.log("Connected to Mongo Atlas instance."))
  .on("error", (error) =>
    console.log("Error connecting to Mongo Atlas:", error)
  );

app.use(bodyParser.json());
app.use(
  "/graphql",
  expressGraphQL({
    schema,
    graphiql: true,
  })
);

app.use(express.static("/home/miggy/Desktop/apps/blog-graphql/dist"));
// app.use(express.static(path.join(__dirname, "dist")));
app.get("*", (req, res) => {
  // res.sendFile(path.join(__dirname + "/client/dist/index.html"));
  res.sendFile("/home/miggy/Desktop/apps/blog-graphql/dist/index.html");
});

const webpackMiddleware = require("webpack-dev-middleware");
const webpack = require("webpack");
const webpackConfig = require("../webpack.config.js");
app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;
