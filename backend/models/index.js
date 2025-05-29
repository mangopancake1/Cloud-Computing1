// models/index.js
import db from "../config/Database.js";
import Users from "./userModel.js";
import Concerts from "./concertModel.js";
import SeatClasses from "./seatClassModel.js";
import Tickets from "./ticketModel.js";

// Relasi antar tabel

// User memiliki banyak tiket
Users.hasMany(Tickets, { foreignKey: "userId", onDelete: "CASCADE" });
Tickets.belongsTo(Users, { foreignKey: "userId" });

// Concert memiliki banyak tiket
Concerts.hasMany(Tickets, { foreignKey: "concertId", onDelete: "CASCADE" });
Tickets.belongsTo(Concerts, { foreignKey: "concertId" });

// SeatClass memiliki banyak tiket
SeatClasses.hasMany(Tickets, { foreignKey: "seatClassId", onDelete: "CASCADE" });
Tickets.belongsTo(SeatClasses, { foreignKey: "seatClassId" });

export { db, Users, Concerts, SeatClasses, Tickets };
