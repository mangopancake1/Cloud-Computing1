import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const refreshToken = async (req, res) => {
  try {
    const refreshTokenCookie = req.cookies.refreshToken;

    if (!refreshTokenCookie) return res.sendStatus(401); // Unauthorized

    const user = await User.findOne({
      where: {
        refresh_token: refreshTokenCookie,
      },
    });

    if (!user) return res.sendStatus(403); // Forbidden

    jwt.verify(
      refreshTokenCookie,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) return res.status(403).json({ msg: "Invalid refresh token" });

        const { id, username, role, email } = user;

        const accessToken = jwt.sign(
          { id, username, role, email },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "30m" }
        );

        res.json({ accessToken });
      }
    );
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
