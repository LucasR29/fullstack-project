import { NextFunction, Request, response, Response } from "express";
import { AnySchema } from "yup";

export const checkUUID = () => async (req: Request, res: Response, next: NextFunction) => {
    const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

    if (!regexExp.test(req.params.id)) {
        return res.status(404).json({ message: "invalid uuid" })
    }

    return next()
}