"use strict";
// const { User, Item } = require('./index')
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RentItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      RentItem.belongsTo(models.User, { foreignKey: "UserId" }); //one to many
      RentItem.belongsTo(models.Item, { foreignKey: "ItemId" }); //one to many
    }
  }
  RentItem.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      ItemId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Items",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
    },
    {
      sequelize,
      modelName: "RentItem",
    }
  );
  return RentItem;
};
