import dotenv from "dotenv";
dotenv.config({});
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
const app = express();

const PORT = process.env.PORT || 4000;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  method: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsOptions));

// Log each request route
app.use((req, res, next) => {
  console.log(
    "----------------------------------------------------------------------------------"
  );
  console.log(`Route being hit: ${req.method} ${req.path}`);
  console.log("Req Body", req.body);
  console.log("Req Params", req.params);
  console.log("Req Query", req.query);
  console.log(
    "----------------------------------------------------------------------------------"
  );
  next();
});

//route handlers
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});
