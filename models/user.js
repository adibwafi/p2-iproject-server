"use strict";
const bcrypt = require('bcryptjs')
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Item, { through: models.RentItem }); //many to many
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `Username is required`,
          },
          notNull: {
            msg: `Username is required`,
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "Email address has been used",
        },
        validate: {
          notEmpty: {
            msg: `Email is required`,
          },
          notNull: {
            msg: `Email is required`,
          },
          isEmail: {
            msg: `Invalid email format`,
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `Password is required`,
          },
          notNull: {
            msg: `Password is required`,
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `Phone number is required`,
          },
          notNull: {
            msg: `Phone number is required`,
          },
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `Address is required`,
          },
          notNull: {
            msg: `Address is required`,
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
      beforeCreate: async (data) => {
      let hashPass = bcrypt.hashSync(data.password, 10)
      data.password = hashPass
      }}
    }
  );
  return User;
};
