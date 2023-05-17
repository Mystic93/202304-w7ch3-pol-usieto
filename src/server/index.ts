import express from "express";
import cors from "cors";
import morgan from "morgan";

const allowedOrigins = ["http://localhost:5173"];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

const app = express();

app.use(cors(options));

app.disable("x-powered-by");

app.use(morgan("dev"));

app.use(express.json());

export default app;
