const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const users = [];

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
  }
});

app.post("/login", async (req, res) => {
  console.log("login-email", req.body);
  const { email } = req.body;

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
  } else {
    res.send(
      JSON.stringify({
        message: "Извините, вы ввели некорректные данные",
        success: false,
      })
    );
  }
});

const { Pool } = require("pg");
const pool = new Pool({
  host: "http://localhost/",
  port: 8002,
  database: "postgres",
  user: "postgres",
  password: "postgres",
});

const weatherController = async (req, res) => {
  writeCityWeatherData(req.body);
  res.end();
};

const writeCityWeatherData = async (dataToWrite) => {
  const { name, localtime, temp_c, gust_kph } = dataToWrite;
  pool.connect(function (err, client, done) {
    if (err) {
      return console.error("connetion error", err);
    }
    client.query(
      "INSERT INTO cities(name, local_time, temp_c, gust_kph) VALUES($1, $2, $3, $4)",
      [name, localtime, Math.floor(temp_c), Math.floor(gust_kph)],
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
};

app.post("/weather", weatherController);

// app.post("/weather", async (req, res) => {
//   const { name } = req.body.name;
//   const { localtime } = req.body.localtime;
//   const { temp_c } = req.body.temp_c;
//   const { gust_kph } = req.body.gust_kph;
//   weatherData.push({ name, localtime, temp_c, gust_kph });
//   res.send(
//     JSON.stringify({
//       message: "Данные погоды занесены на сервер",
//       success: true,
//     })
//   );
// });

app.listen(8000, () => {
  console.log("server running");
});
