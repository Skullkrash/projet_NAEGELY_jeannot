const { checkJwt}  = require('./jwtMiddleware');

module.exports = app => {
    const utilisateur = require("../controllers/utilisateur.controllers.js");
  
    var router = require("express").Router();
  

    // Login
    router.post("/login", utilisateur.login);

    // Register
    router.post("/register", utilisateur.register);

    // Update login
    router.post("/updateUserLogin", checkJwt, utilisateur.updateUserLogin);

    // Update password
    router.post("/updateUserPassword", checkJwt, utilisateur.updateUserPassword);
  
    app.use('/api/utilisateur', router);
  };
