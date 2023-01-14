const {Router} = require('express');
const UserModel = require('../model/Register');
const jwt = require('jsonwebtoken');
const route = Router();
const auth = require('../middleware/auth');
const thapaAuth = require('../middleware/thapaAuth');

route.get('/', (req, res) => {
    res.render('home');
})

route.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    await UserModel.create({
        name: name,
        email: email,
        password: password
    }).then(data => {
        res.status(200).render('login');
    }).catch(err => {
        res.status(400).send(err)
    });
})

route.get('/login', async (req, res) => {
    res.render('login');
})

route.post('/loginpost', async (req, res) => {
    try {
        const { email, password } = req.body;
        await UserModel.findOne({ email: email })
            .then(data => {
                if (data.password === password) {
                    const token = jwt.sign({_id : data._id, name : data.name, time : Date()}, 'qwertyuiopasdfghjklzxcvbnmqwertyuiocvbnsdfghjrtyuisdfghjkoiuytrekjhgfdshjkjhrtyuiooiuytresjkkjhgfdsdfyuiiuytreyui');
                    res.cookie('token', token);
                    res.redirect('/welcome');
                }
                else {
                    res.render('login');
                }
            })
            .catch(err => err);
    }
    catch (err) {
        console.log(err);
    }
})

route.get('/welcome', auth, (req, res) => {
    res.render('welcome');
})

route.get('/secretPage', auth, (req, res) => {
    res.send('pradeep');
})

route.get('/logout', auth, (req, res) => {
    res.clearCookie('token');
    res.redirect('/login');
})

module.exports = route;