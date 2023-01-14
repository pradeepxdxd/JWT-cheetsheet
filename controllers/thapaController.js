const ThapaRegisModel = require('../model/ThapaRegisSchema');
const bcrypt = require('bcrypt');

exports.thapaRegisController = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;
        const userIfExist = await ThapaRegisModel.findOne({ email });
        if (userIfExist) {
            return res.status(400).send({
                'status': 400,
                'err': 'user already exist',
            })
        }
        const user = new ThapaRegisModel({
            name: name,
            email: email,
            password: password,
            phone: phone
        });

        const userRegistered = await user.save();

        res.status(201).send({
            "statusCode": 201,
            "msg": "user registered successfully",
            "data": userRegistered
        })
    }
    catch (err) {
        res.status(400).send({ 'status': 400, 'err': 'Something went wrong' });
    }
}

exports.thapaLoginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await ThapaRegisModel.findOne({ email });
        if (user) {
            if (bcrypt.compare(password, user.password)) {
                const token = await user.generateUserToken();
                res.cookie('_token', token);
                res.status(200).send({
                    'statusCode': 200,
                    'msg': 'user logged in successfully',
                    'data': user,
                    'token': token
                })
            }
            else {
                res.status(400).send({
                    'statusCode': 400,
                    'err': 'incorrect email & password'
                })
            }
        }
        else {
            res.status(400).send({
                'statusCode': 400,
                'err': 'invalid email and password'
            })
        }
    }
    catch (err) {
        res.status(400).send({ 'status': 400, 'err': 'Internal Server Error' });
    }
}

exports.thapaLogoutController = async (req, res) => {
    try{
        req.user.tokens = req.user.tokens.filter((token => {
            return token.token !== req.token;
        }))
        
        res.clearCookie('_token');
        await req.user.save();
        res.status(200).send({
            'statusCode' : 200,
            'msg' : 'Logout Successfully'
        });
    }
    catch(err){
        res.status(500)
            .send({
                'statusCode' : 500,
                'err' : 'Internal Server Error'
            })
    }
}