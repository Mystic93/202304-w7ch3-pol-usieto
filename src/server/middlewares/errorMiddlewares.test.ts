import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../CustomError/CustomError.js";
import { generalError, notFoundError } from "./errorMiddlewares.js";

type CustomResponse = Pick<Response, "status" | "json">;

const res: CustomResponse = {
  json: jest.fn(),
  status: jest.fn().mockReturnThis(),
};
const req = {};
const next = jest.fn();

describe("Given a notFoundError function", () => {
  describe("When it receives a next function", () => {
    test("Then it should call it with the custom error with status code 404 and message 'Sorry endpoint not found'", () => {
      const customError = new CustomError(404, "Sorry endpoint not found");

      notFoundError(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(customError);
    });
  });
});

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
