import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import postRoutes from "./routes/postRoutes";
import commentRoutes from "./routes/commentRoutes";
import initializePassport from "./passport/initializePassport";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

initializePassport();

mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGO_URL;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
  console.log("MongoDB connected");
}

const corsOptions = {
  origin: process.env.CLIENT_URL, 
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", 
  credentials: true, 
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.TOKEN_SECRET_KEY!,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === "production" },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", authRoutes);
app.use("/", userRoutes);
app.use("/", postRoutes);
app.use("/", commentRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port: http://localhost:${PORT}/`);
});
