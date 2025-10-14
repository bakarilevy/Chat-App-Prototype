import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/messages.route.js";
import { connectDB } from "./lib/db.js";
import {ENV} from "./lib/env.js";

const app = express();
const __dirname = path.resolve();

const PORT = ENV.PORT || 3000;


app.use(express.json());
app.use(cors({origin:ENV.CLIENT_URL, credentials:true}));
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/messages", messageRoutes);

// Production script
if(ENV.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (_, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    })
}

app.listen(PORT, () => {
    console.log("Server running on port ", PORT);
    connectDB();
});

