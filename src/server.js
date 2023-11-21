const express = require("express");
const cors = require("cors");
const routes = require('./routes')


const app = express();

const corsOptions = {
  origin: "http://localhost:9998"
};

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions));
app.use(cors({options: '*'}))
app.options("*",cors());
app.use(routes);

const db = require("./models");
const {options} = require("pg/lib/defaults");
const Role = db.role;

db.sequelize.sync({alter: true}).then(() => {
  console.log('Drop and Rsync Db');
  initial();
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require('./routes/admin/auth')(app);
require('./routes/admin/user')(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


function initial() {
  Role.create({
    id: 1,
    name: "USER"
  });

  Role.create({
    id: 2,
    name: "MODERATOR"
  });

  Role.create({
    id: 3,
    name: "ADMIN"
  });
}