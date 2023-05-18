import { type NextFunction, type Request, type Response } from "express";
import type CustomError from "../../CustomError/CustomError.js";
import { generalError } from "./errorMiddlewares.js";

type CustomResponse = Pick<Response, "status" | "json">;

const res: CustomResponse = {
  json: jest.fn(),
  status: jest.fn().mockReturnThis(),
};
const req = {};
const next = jest.fn();

describe("Given a generalError function", () => {
  describe("When called with an unknown error", () => {
    test("Then it shoul call response with code 500 and a message with 'Internal Server Error'", () => {
      const error = new Error("Internal Server Error");
      const statusCode = 500;
      const { message } = error;

      generalError(
        error as CustomError,
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(statusCode);
      expect(res.json).toHaveBeenCalledWith({ message });
    });
  });
});
