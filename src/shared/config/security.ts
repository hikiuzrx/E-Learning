import type { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import helmet from "helmet";


const logger = morgan("combined"); // or "dev" for development


const securityHeaders = helmet();


export const securityMiddleware = [
  logger,
  securityHeaders
];

