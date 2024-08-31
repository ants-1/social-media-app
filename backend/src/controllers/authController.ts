import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { IUser } from "models/user";
import generateToken from "../config/generateToken";

const sign_up = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  passport.authenticate("signup", (err: Error, user: IUser) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(400).json({ message: "Sign up failed" });
    }
    return res.status(200).json({
      message: "Signed up successfully. Login to access the app",
      user,
    });
  })(req, res, next);
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("login", async (err: Error, user: IUser) => {
    if (err || !user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    try {
      req.login(user, { session: false }, async (error) => {
        if (error) {
          return res.status(400).json({ error: "Error while logging in" });
        }
        const token = generateToken(user);
        return res.status(200).json({ success: true, token });
      });
    } catch (err) {
      return next(err);
    }
  })(req, res, next);
};

const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    return res.status(200).json({ success: "Logout successful" });
  });
};

export default {
  sign_up,
  login,
  logout,
};
