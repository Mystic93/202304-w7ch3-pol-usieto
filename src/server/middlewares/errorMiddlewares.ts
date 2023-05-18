import { type Request, type NextFunction, type Response } from "express";
import CustomError from "../../CustomError/CustomError.js";
import chalk from "chalk";
import createDebug from "debug";

const debug = createDebug("item-api:server/middlewares/errorMiddlewares.ts");

export const notFoundError = (
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  const error = new CustomError(404, "Sorry endpoint not found");

  next(error);
};

export const generalError = (
  error: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = error.statusCode || 500;

  const message = error.statusCode ? error.message : "Internal Server Error";

  debug(`Error: ${chalk.bgRed(error.statusCode)} ${chalk.red(error.message)}`);

  res.status(statusCode).json({ message });
};
