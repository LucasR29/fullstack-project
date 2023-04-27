import { NextFunction, Request, Response } from "express";
import { AnySchema } from "yup";

export const ensureDataIsValidMiddleware = (schema: AnySchema) => async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body)
    try {
        const validated = await schema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true
        })
        req.body = validated
        return next()
    } catch (error: any) {
        const [errors] = error.errors
        return res.status(400).json({
            message: errors
        })
    }
}