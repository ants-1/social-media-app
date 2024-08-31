import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import User from "../../models/user";

const initializeLogin = (): void => {
  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: 'username', 
        passwordField: 'password',
      },
      async (username: string, password: string, done: Function) => {
        try {
          const user = await User.findOne({ username });
          if (!user) {
            return done(null, false, { message: "Invalid username" });
          }
          const matchedPassword = await bcrypt.compare(password, user.password);
          if (!matchedPassword) {
            return done(null, false, { message: "Invalid password" });
          }
          return done(null, user);
        } catch (error) {
          console.error(error);
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user: any, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};

export default initializeLogin;
