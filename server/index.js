const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const { Pool } = require("pg");
const pool = new Pool({
  host: "localhost",
  port: 8002,
  database: "postgres",
  user: "postgres",
  password: "postgres",
});

const app = express();

let users = [];

app.use(cors());
app.use(bodyParser.json());

app.post("/registration", async (req, res) => {
  console.log("registration-data", req.body);
  // валидация на значёк @ в поле email отсутствует
  const { email, password } = req.body;

  const currentUserFromDB = users.find((user) => user.email === email);

  if (currentUserFromDB) {
    res.send(
      JSON.stringify({
        message: "Извините, пользователь с такими данными зарегистрирован",
        success: false,
      })
    );
  } else {
    users.push({ email, password });
    res.send(
      JSON.stringify({ message: "Регистрация прошла успешно", success: true })
    );

    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const day = new Date().getDate();
    const hour = new Date().getHours();
    const minutes = new Date().getMinutes();
    const sec = new Date().getSeconds();
    const fullDate =
      year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + sec;

    console.log("date:", fullDate);
    pool.connect(function (err, client, done) {
      if (err) {
        return console.error("connetion error", err);
      }
      client.query(
        "INSERT INTO users(email, user_password, date, status) VALUES($1, $2, $3, $4)",
        [email, password, fullDate, "registration"],
        function (err, result) {
          // call `done()` to release the client back to the pool
          done();

          if (err) {
            return console.error("error running query", err);
          }
          console.log("-->", result);
        }
      );
    });
  }
});

app.post("/login", async (req, res) => {
  console.log("login-email", req.body);
  const { email, password } = req.body;

  const currentUserFromDB = users.find((user) => user.email === email);
  // токеном будет индекс пользователя в массиве пользователей
  const token = users.indexOf(currentUserFromDB);

  if (currentUserFromDB) {
    res.send(
      JSON.stringify({
        message: "Авторизация прошла успешно",
        success: true,
        user: currentUserFromDB.email,
        token: token,
      })
    );

    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const day = new Date().getDate();
    const hour = new Date().getHours();
    const minutes = new Date().getMinutes();
    const sec = new Date().getSeconds();
    const fullDate =
      year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + sec;

    console.log("date:", fullDate);
    pool.connect(function (err, client, done) {
      if (err) {
        return console.error("connetion error", err);
      }
      client.query(
        "INSERT INTO users(email, user_password, date, status) VALUES($1, $2, $3, $4)",
        [email, password, fullDate, "autorization"],
        function (err, result) {
          // call `done()` to release the client back to the pool
          done();

          if (err) {
            return console.error("error running query", err);
          }
          console.log("-->", result);
        }
      );
    });
  } else {
    res.send(
      JSON.stringify({
        message: "Извините, вы ввели некорректные данные",
        success: false,
      })
    );
  }
});

app.post("/data", async (req, res) => {
  console.log("data", req.body);
  // валидация на значёк @ в поле email отсутствует
  const { answer } = req.body;

  const currentUserFromDB = answer;

  if (currentUserFromDB) {
    res.send(
      JSON.stringify({
        message: "Данные удалены!",
        success: false,
      })
    );

    pool.connect(function (err, client, done) {
      if (err) {
        return console.error("connetion error", err);
      }
      users = [];
      client.query(
        "DROP TABLE users; CREATE TABLE users (id SERIAL PRIMARY KEY, email CHARACTER VARYING(30), user_password CHARACTER VARYING(30), date CHARACTER VARYING(30), status CHARACTER VARYING(30) );",
        function (err, result) {
          // call `done()` to release the client back to the pool
          done();

          if (err) {
            return console.error("error running query", err);
          }
          console.log("-->", result);
        }
      );
    });
  } else {
    res.send(JSON.stringify({ message: "Данные не удалены!", success: false }));
    console.log("answer:", answer);
  }
});

app.listen(9500, () => {
  console.log("server running");
});
