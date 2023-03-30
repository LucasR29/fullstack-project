import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import Client from "../entities/clients/client.entity";
import Contact from "../entities/contacts/contact";


export const verifyContactEmailMiddleware = () => async (req: Request, res: Response, next: NextFunction) => {
    const clientRepository = AppDataSource.getRepository(Client)
    const contactRepository = AppDataSource.getRepository(Contact)

    const findClient = await clientRepository.findOneBy({ id: req.params.id })

    if (!findClient) {
        return res.status(409).json({ "message": "Client does not exists" })
    }

    const findContact = await contactRepository.findOne({
        where: {
            client: findClient,
            email: req.body.email
        }
    })

    if (findContact) {
        return res.status(409).json({ "message": "Contact email already registred for this user" })
    }


    return next()
}