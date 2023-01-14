const jwt = require('jsonwebtoken');
const ThapaRegisModel = require('../model/ThapaRegisSchema');

const thapaAuth = async (req, res, next) => {
    try{
        const token = req.cookies._token;
        const verify =jwt.verify(token, 'pradeepbiswas');
        
        const user = await ThapaRegisModel.findOne({_id : verify._id});

        req.token = token;
        req.user = user;
        
        next();
    }
    catch(err){
        res.status(401).send(err);
    }
}

module.exports = thapaAuth;