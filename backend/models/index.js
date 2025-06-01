// models/index.js
import db from "../config/Database.js";
import Users from "./userModel.js";
import Concerts from "./concertModel.js";
import Tickets from "./ticketModel.js";

// Relasi antar tabel

// User memiliki banyak tiket
Users.hasMany(Tickets, { foreignKey: "userId", onDelete: "CASCADE" });
Tickets.belongsTo(Users, { foreignKey: "userId" });

// Concert memiliki banyak tiket
Concerts.hasMany(Tickets, { foreignKey: "concertId", onDelete: "CASCADE" });
Tickets.belongsTo(Concerts, { foreignKey: "concertId" });


export { db, Users, Concerts, Tickets };
