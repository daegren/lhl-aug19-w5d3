const { Client } = require("pg");
const express = require("express");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8080;

const db = new Client({
  host: "localhost",
  user: "postgres",
  password: "postgres",
  database: "w5d1_lecture",
  port: 5432
});
db.connect();

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));

// MODELS

const projects = require("./models/project")(db);

// ROUTES

app.get("/projects", (req, res) => {
  projects
    .all()
    .then(projects => {
      res.render("projects/index", { projects });
    })
    .catch(err => {
      res.status(500).send(err.message);
    });
});

app.get("/projects/new", (req, res) => {
  res.render("projects/new");
});

app.post("/projects", (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.redirect("/projects/new");
    return;
  }

  projects
    .create(name)
    .then(project => {
      res.redirect(`/projects/${project.id}`);
    })
    .catch(err => {
      res.status(500).send(err.message);
    });
});

app.get("/projects/:id", (req, res) => {
  projects
    .find(req.params.id)
    .then(project => {
      res.render("projects/show", { project });
    })
    .catch(err => {
      res.status(500).send(err.message);
    });
});

app.listen(PORT, () => {
  console.log(`Application is running at http://localhost:${PORT}`);
});
