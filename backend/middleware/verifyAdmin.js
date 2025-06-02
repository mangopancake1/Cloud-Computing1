import jwt from "jsonwebtoken";

export const verifyAdmin = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ msg: "Token tidak ditemukan" });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ msg: "Token tidak valid atau kadaluarsa" });

    if (user.role !== 'admin') {
      return res.status(403).json({ msg: "Akses ditolak: hanya admin yang berhak" });
    }

    req.user = user;
    next();
  });
};
