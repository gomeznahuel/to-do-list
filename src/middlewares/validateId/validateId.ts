import { NextFunction, Request, Response } from "express";
import { isValidObjectId } from "mongoose";

export const validateId = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  next();
};