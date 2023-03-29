import { Request, Response } from "express";
import { IClientCreationRequest } from "../interfaces/clients.interface";
import { createClientService, deleteClientService, listClientService, retrieveClientService, updateClientService } from "../services/clients/client.service";


export const createClientController = async (request: Request, response: Response) => {
    const clientData: IClientCreationRequest = request.body
    const newClient = await createClientService(clientData)

    return response.status(201).json(newClient)
}

export const listClientsController = async (request: Request, response: Response) => {
    const clients: IClientCreationRequest[] = await listClientService()

    return response.status(200).json(clients)
}

export const retrieveClientController = async (request: Request, response: Response) => {
    const [status, message]: any = await retrieveClientService(request.params.id)

    return response.status(status).json(message)
}

export const deleteClientController = async (request: Request, response: Response) => {
    const [status, message]: any = await deleteClientService(request.params.id)

    return response.status(status).json(message)
}

export const updateClientController = async (request: Request, response: Response) => {
    const [status, message]: any = await updateClientService(request.body, request.params.id)

    return response.status(status).json(message)
}