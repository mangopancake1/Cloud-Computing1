import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Ticket = db.define("tickets", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  concertId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  totalPrice: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  buyerName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  buyerEmail: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  buyerGender: {
    type: DataTypes.ENUM("male", "female"),
    allowNull: false,
  },
  seatName: {
    type: DataTypes.ENUM("diamond", "gold", "silver"),
    allowNull: false,
  }
}, {
  freezeTableName: true,
});

export default Ticket;
