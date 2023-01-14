const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        const verified = jwt.verify(token, 'qwertyuiopasdfghjklzxcvbnmqwertyuiocvbnsdfghjrtyuisdfghjkoiuytrekjhgfdshjkjhrtyuiooiuytresjkkjhgfdsdfyuiiuytreyui');

        next();
    }
    catch (err) {
        res.status(401).send(err);
    }

}

module.exports = auth;