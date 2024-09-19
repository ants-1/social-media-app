import { IUser } from "models/user";
import jwt from "jsonwebtoken";

const generateToken = (user: IUser): string => {
    const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY as string;
    const TOKEN_EXPIRE_TIME = process.env.TOKEN_EXPIRE_TIME as string;

    const { _id, username } = user;
    return jwt.sign(
      {
        user: {
          _id,
          username,
        },
      },
      TOKEN_SECRET_KEY,
      { expiresIn: TOKEN_EXPIRE_TIME }
    );
  };

export default generateToken;
