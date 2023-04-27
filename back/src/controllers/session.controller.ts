import { Request, Response } from "express";
import { IUserRequest } from "../interfaces/clients.interface";
import { createSessionService } from "../services/login/createSession.service";


export const createSessionController = async (req: Request, res: Response) => {
    const sessionData: IUserRequest = req.body;
    const [data, status] = await createSessionService(sessionData);
    return res.status(status).json(data)
};