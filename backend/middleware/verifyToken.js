import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log("Auth Header:", authHeader);

  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log("JWT Error:", err.message);
      return res.status(403).json({ message: "Invalid or expired token" });
    }
    req.user = user;
    next();
  });
};
