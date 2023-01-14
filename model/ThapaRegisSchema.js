const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const ThapaRegSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

ThapaRegSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = bcrypt.hashSync(this.password, 10);
    }
    next();
})

ThapaRegSchema.methods.generateUserToken = async function () {
    try {
        const token = jwt.sign({ _id: this._id.toString() }, 'pradeepbiswas', { expiresIn: '2h' });
        this.tokens = this.tokens.concat({token})
        await this.save(); 
        return token;
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = mongoose.model('ThapaRegist', ThapaRegSchema);