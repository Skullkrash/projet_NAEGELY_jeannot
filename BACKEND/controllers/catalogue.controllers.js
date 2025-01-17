const db = require("../models");
const Objekts = db.objekts;
const Op = db.Sequelize.Op;

exports.get = (req, res) => {
    Objekts.findAll()
    .then(responseObjekts => {
      if (responseObjekts) {
        res.setHeader('Content-Type', 'application/json');
    	  res.send(responseObjekts);
      } else {
        res.status(404).send({
          message: `Cannot find any Objekt.`
        });
      }
    })
};    

