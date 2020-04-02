'use strict';
module.exports = (sequelize, DataTypes) => {
  class Travel extends sequelize.Sequelize.Model { }
  Travel.init({
    // attributes
    destination: {
      type: DataTypes.STRING,
      allowNull: false
    },
    activity: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    travel_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isAfter: {
          args: `${new Date().toLocaleDateString()}`,
          msg: "The date entered is already past"
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Travel'
    // options
  })

  Travel.associate = function (models) {
    // associations can be defined here
    Travel.belongsTo(models.User)
  };
  return Travel;
};