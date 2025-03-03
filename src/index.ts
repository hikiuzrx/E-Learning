import "./shared/config/exceptions";
import express, { type Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { configDotenv } from "dotenv";
import { securityMiddleware } from "./shared/config/security";
import { chatRoutes } from "./infrastructure/routes/chat.routes";
import morgan from "morgan";
import { Server } from "socket.io";
import http from "http";
import { setupSocket } from "./infrastructure/socket/socketMessage";

configDotenv();
const app: Express = express();

const API_PORT = process.env.API_PORT || 3000; // REST API Port
const SOCKET_PORT = process.env.SOCKET_PORT || 4000; // WebSocket Port

// Setup CORS options
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(securityMiddleware);
app.use(morgan("combined"));

app.use("/chat", chatRoutes());

app.listen(API_PORT, () => {
  console.log(`REST API running on http://localhost:${API_PORT}`);
});


const socketServer = http.createServer();
const io = new Server(socketServer, {
  cors: { origin: "*" },
});


setupSocket(io);


socketServer.listen(SOCKET_PORT, () => {
  console.log(`WebSocket Server running on ws://localhost:${SOCKET_PORT}`);
});
