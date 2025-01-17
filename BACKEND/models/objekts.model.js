module.exports = (sequelize, Sequelize) => {
    const Objekts = sequelize.define("objekts", {
  
     id: {
          type: Sequelize.STRING,
          primaryKey:true,
          allowNull: false
        },  
      nom: {
        type: Sequelize.STRING,
        allowNull: false
      },
      prix: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },    
      description: {
          type: Sequelize.STRING,
      },
      stock: {
          type: Sequelize.INTEGER,
          allowNull: false
      }
   });
  return Objekts;
  };
  