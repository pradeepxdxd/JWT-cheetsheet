const jwt = require("jsonwebtoken");

exports.bearerAuth = (req, res, next) => {
    try{
        const bearerHeader = req.headers['authorization'];
        if(bearerHeader){
            const token = bearerHeader.split(' ')[1];
            if(token){
                const verified = jwt.verify(token, 'pradeepbiswas');
                if(!verified){
                    res.status(403).send({
                        'err' : 'Invalid jwt token'
                    })
                }
                else {
                    next();
                }
            }
            else {
                res.status(403).send({
                    'err' : 'Invalid jwt token'
                })
            }
        }
    }
    catch(err){
        res.status(403).send({
            'err' : 'Invalid jwt token'
        })
    }
}