import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import Client from "../entities/client.entity";

export const verifyClientEmailMiddleware = () => async (req: Request, res: Response, next: NextFunction) => {
    const clientRepository = AppDataSource.getRepository(Client)

    const exist = await clientRepository.findOneBy({ email: req.body.email })

    if (exist) {
        return res.status(409).json({ "message": "Client with the same email alredy exists" })
    }

    return next()
}