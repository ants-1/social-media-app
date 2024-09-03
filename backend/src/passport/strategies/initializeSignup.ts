import passport from "passport";
import { Request } from "express";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import User from "../../models/user";

const initializeSignUp = (): void => {
  passport.use(
    "signup",
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true,
      },
      async (req: Request, username: string, password: string, done) => {
        try {
          const { email, name } = req.body;

          const hashedPassword = await bcrypt.hash(password, 10);

          const newUser = await User.create({
            username,
            name,
            email,
            password: hashedPassword,
          });

          return done(null, newUser);
        } catch (error) {
          console.error(error);
          return done(error);
        }
      }
    )
  );
};

export default initializeSignUp;
