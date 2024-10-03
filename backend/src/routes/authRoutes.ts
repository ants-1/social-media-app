import express from "express";
import authController from "../controllers/authController";
import verifyToken from "../config/verifyToken";
import passport from "passport";

const router = express.Router();

router.post("/sign-up", authController.sign_up);

router.post("/login", authController.login);

router.get("/logout", authController.logout);

router.get("/user-token", verifyToken);

// Google OAuth login route
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google OAuth callback route
router.get("/google/callback", authController.googleCallback);

export default router;
