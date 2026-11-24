import { Request, Response, NextFunction } from "express";
import { ZodError, ZodType } from "zod";
import { HTTP_STATUS } from "../utils/constants";
import { errorResponse } from "../utils/response";

const formatIssues = (error: unknown): string | undefined => {
  if (!(error instanceof ZodError)) {
    return undefined;
  }

  return error.issues
    .map((issue) => `${issue.path.map(String).join(".") || "body"}: ${issue.message}`)
    .join("; ");
};

export const validate = (schema: ZodType, property: "body" | "query" | "params" = "body") => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const parsed = schema.parse(req[property]);
      // Conserva los valores transformados por Zod (por ejemplo, defaults).
      (req as unknown as Record<string, unknown>)[property] = parsed;
      next();
    } catch (error: unknown) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json(errorResponse("Error de validación", formatIssues(error)));
    }
  };
};
