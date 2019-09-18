const { Client } = require("pg");

const db = new Client({
  host: "localhost",
  user: "postgres",
  password: "postgres",
  database: "w5d1_lecture",
  port: 5432
});
db.connect();

db.query("SELECT * FROM projects;")
  .then(res => {
    console.log("result", res);
  })
  .catch(err => {
    console.log("error", err);
  })
  .finally(() => {
    db.end();
  });
