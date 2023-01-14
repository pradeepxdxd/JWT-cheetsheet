const express = require('express');
const port = 9000;
const exphbs = require('express-handlebars');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const UserModel = require('./model/Register');

// connecting to db
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/token')
    .then(res => console.log('db connected'))
    .catch(err => err);

// parsing req body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.set('view engine', 'handlebars');
app.set('views', './views');
app.engine('handlebars', exphbs.engine());

const route = require('./routes/routes');
const thapaRoutes = require('./routes/thapaRoutes');

app.use('/', route);
app.use('/thapa', thapaRoutes);

app.listen(port, () => console.log(port));