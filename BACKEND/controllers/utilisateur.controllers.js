const { v4: uuidv4 } = require ("uuid");
const { ACCESS_TOKEN_SECRET }  = require ("../config.js");

const jwt = require('jsonwebtoken');

function generateAccessToken(user) {
  return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: '1800s' });
}

const db = require("../models");
const Utilisateurs = db.utilisateurs;
const Op = db.Sequelize.Op;

// Find a single User with a login
exports.login = (req, res) => {
  const utilisateur = {
    login: req.body.login,
    password: req.body.password
  };
  // Test
  let pattern = /^[A-Za-z0-9]{1,20}$/;
  if (pattern.test(utilisateur.login) && pattern.test(utilisateur.password)) {
    Utilisateurs.findOne({ where: { login: utilisateur.login, password: utilisateur.password } })
    .then(data => {
      if (data) {
        const user = {
          id: data.id,
          name: data.nom,
          prenom: data.prenom,
          login: data.login,
          password: data.password
        };
      
        let accessToken = generateAccessToken(user);
        res.setHeader('Authorization', `Bearer ${accessToken}`);
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find User with these credentials.`
        });
      }
    })
    .catch(err => {
      res.status(400).send({
        message: "Error retrieving User"
      });
    });
  } else {
    res.status(400).send({
      message: "Login or password is incorrect" 
    });
  }
};


exports.register = (req, res) => {
  const utilisateur = {
    nom: req.body.nom,
    prenom: req.body.prenom,
    login: req.body.login,
    password: req.body.password,
    passwordConfirmation: req.body.passwordConfirmation
  };
  
  if (utilisateur.password !== utilisateur.passwordConfirmation) {
    res.status(404).send({
      message: `Password and confirmation do not match`
    });
  }

  Utilisateurs.findOne({ where: { login: utilisateur.login } })
  .then(data => {
    if (data) {
      res.status(400).send({
        message:"Login already exists"
      });
    }
    else {
      // Create user
      Utilisateurs.create({ nom: utilisateur.nom, prenom: utilisateur.prenom, login: utilisateur.login, password: utilisateur.password });
      res.status(200).send({
        message:"User created !"
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error retrieving user"
    });
  });
}

exports.updateUserLogin = (req, res) => {
  const { login, newLogin, newLoginConfirmation } = req.body;

  if (newLogin !== newLoginConfirmation) {
    res.status(404).send({
      message: `Login and confirmation do not match`
    });
  }

  Utilisateurs.findOne({ where: { login: login } })
  .then(user => {
    if (user) {
      user.login = newLogin;
      user.save()
      .then(() => {
        res.status(200).send({
          message: `Login updated`
        });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating login"
        });
      });
    } else {
      res.status(404).send({
        message: `User not found`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error retrieving user"
    });
  });
}

exports.updateUserPassword = (req, res) => {
  const { login, newPassword, newPasswordConfirmation } = req.body;

  if (newPassword !== newPasswordConfirmation) {
    res.status(404).send(
      {
        message: `New password and confirmation do not match`
      });
  }

  Utilisateurs.findOne({ where: { login: login } })
  .then(user => {
    if (user) {
      if (user.password === newPassword) {
        res.status(404).send({
          message: `New password is the same as the old one`
        });
      }
      else {
        user.password = newPassword;
        user.save()
        .then(() => {
          res.status(200).send({
            message: `Password updated`
          });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating password"
          });
        });
      }
    } else {
      res.status(404).send({
        message: `Password not found`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error retrieving user"
    });
  });
}