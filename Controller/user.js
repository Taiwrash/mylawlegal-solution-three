const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        firstName: req.body.firstName,
        role: req.body.role,
        password: hash,
      });
      user.save().then(() => {
        const token = jwt.sign(
          {
            userId: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
          },
          "RANDOM_SECRET_KEY",
          {
            expiresIn: "24h",
          }
        );
        const { role } = user;
        res.status(201).json({
          token,
          role,
        });
      });
    })
    .catch((error) => {
      res.json({
        error: "Email has already been used",
      });
    });
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.json({
          error: "User not found!",
        });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.json({
              error: "Incorrect Password!",
            });
          }
          const token = jwt.sign(
            {
              userId: user._id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
            },
            "RANDOM_SECRET_KEY",
            {
              expiresIn: "24h",
            }
          );
          const { role } = user;
          res.status(201).json({
            token,
            role,
          });
        })
        .catch((error) => {
          res.status(500).json({
            error: "Input correct credentials!",
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        error: "You must have correct login details or sign up otherwise!",
      });
    });
};

exports.view = (req, res, next) => {
  User.findById(req.params.id, (err, getUser) => {
    const data = {
      firstName: getUser.firstName,
      lastName: getUser.lastName,
      email: getUser.email,
    };
    if (err) {
      console.log(err);
    } else {
      res.json({ data });
    }
  });
};

exports.edit = (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, req.body, (err, updated) => {
    if (err) {
      res.send({ message: "There was an error updating your profile" });
    } else {
      res.json({ updated, message: "Your Profile has been updated" });
    }
  });
};
