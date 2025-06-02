import jwt from "jsonwebtoken";

// Bisa untuk user & admin (asal token valid)
export const verifyUser = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ msg: "Token tidak ditemukan" });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ msg: "Token tidak valid atau kadaluarsa" });
    req.user = user;
    next();
  });
};
