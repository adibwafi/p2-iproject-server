'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Item.belongsToMany(models.User, { through: models.RentItem }) //many to many
    }
  }
  Item.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Name is required`,
        },
        notNull: {
          msg: `Name is required`,
        },
      },
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Brand is required`,
        },
        notNull: {
          msg: `Brand is required`,
        },
      },
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Type is required`,
        },
        notNull: {
          msg: `Type is required`,
        },
      },
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Price is required`,
        },
        notNull: {
          msg: `Price is required`,
        },
      },
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Image url is required`,
        },
        notNull: {
          msg: `Image url is required`,
        },
      },
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "available"
    }
  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};