const jwt = require('jsonwebtoken');
const ThapaRegisModel = require('../model/ThapaRegisSchema');

const thapaAuth = async (req, res, next) => {
    try {
        const token = req.cookies._token;
        const verify = jwt.verify(token, 'pradeepbiswas');

        const user = await ThapaRegisModel.findOne({ _id: verify._id });

        req.token = token;
        req.user = user;

        next();
    }
    catch (err) {
        res.status(401).send(err);
    }
}

const thapaEdit = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await ThapaRegisModel.findOne({ _id: id });
        const token = user.tokens[0].token;
        
        const validUser = jwt.verify(token, 'pradeepbiswas');

        // next();
    }
    catch (err) {
        res.status(400).send(err);
    }
}

module.exports = { thapaAuth, thapaEdit };