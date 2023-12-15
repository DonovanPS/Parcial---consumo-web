const route = require('express').Router();

const path = require('path');

route.get('/', (req, res) => res.sendFile(path.join(__dirname, '../views/index.html')))

route.get("/add", (req, res) => res.sendFile(path.join(__dirname, "../views/form-course.html")))

module.exports = route;