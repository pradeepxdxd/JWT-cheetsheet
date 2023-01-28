const registerModel = require("../model/Register");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const {email, password} = req.body;
    await registerModel
      .findOne({ email })
      .then((data) => {
        if (password === data.password) {
          const token = jwt.sign({id : data._id}, "pradeepbiswas", { expiresIn: "2h" });
          res.status(200).send({data, 'token' : token});
        } else res.status(401).send({ err: "invalid password" });
      })
      .catch((err) => {
        res.status(400).send({ err: "invalid email and password" });
      });
  } catch (error) {
    res.status(400).send({ err: "something went wrong, please try again" });
  }
};

exports.regis = async (req, res) => {
  try {
    await registerModel
      .create(req.body)
      .then((data) => {
        res.status(201).send(data);
      })
      .catch((err) => {
        res.status(400).send({ err: "something went wrong" });
      });
  } catch (err) {
    res.status(400).send({ err: "something went wrong" });
  }
};

exports.addTodo = (req, res) => {
    try {
        res.send("Pradeep Biswas");
    } catch (error) {
        res.send(error);
    }
}