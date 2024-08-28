import { Request, Response } from "express";
import user from "../models/user";

const sign_up = async (req: Request, res: Response) => {
  res.send("sign up");
}

const login = async (req: Request, res: Response) => {
  res.send("login");
};

const logout = async (req: Request, res: Response) => {
  res.send("logging out");
};

export default {
  sign_up,
  login,
  logout,
};
