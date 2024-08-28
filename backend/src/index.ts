import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from "./routes/authRoutes";
import 'dotenv/config'

const app = express();

const PORT = process.env.PORT || 3000;

mongoose.set("strictQuery", false);
const mongoDB: string | any = process.env.MONGO_URL;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
  console.log("MongoDB connected");
}

app.use(cors());
app.use(bodyParser.json());

app.use('/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port: http://localhost:${PORT}/`);
});

