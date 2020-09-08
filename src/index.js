const express = require("express");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const path = require("path");
// Inicializaciones.

const app = express();

// Ajustes del servidor express.

app.set("port", process.env.PORT || 4000);
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
    helpers: require("./lib/handlebars"),
  })
);

app.set("view engine", ".hbs");

// Middlewars.

app.use(morgan("dev")); // Lo que llega al servidor
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Variables Globales.

app.use((req, res, next) => {
  next();
});

// Rutas (URLs de nuestro servidor)

app.use(require("./routes/index"));
app.use(require("./routes/authentication"));
app.use("/links", require("./routes/links"));

// Arcvivos Publicos (css, js, img, fonts)

app.use(express.static(path.join(__dirname, "public")));

// Start Server

app.listen(app.get("port"), () => {
  console.log("Server on port", app.get("port"));
});
