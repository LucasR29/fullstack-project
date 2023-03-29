import { AppDataSource } from "../../data-source";
import Client from "../../entities/clients/client.entity";
import { IClientCreationRequest } from "../../interfaces/clients.interface";

export const createClientService = async (clientData: IClientCreationRequest): Promise<IClientCreationRequest> => {
    const clientRepository = AppDataSource.getRepository(Client)

    const client = clientRepository.create(clientData)

    const newClient = await clientRepository.save({
        ...client,
    })

    return newClient
}

export const retrieveClientService = async (clientID: string): Promise<any> => {
    const clientRepository = AppDataSource.getRepository(Client)

    const clients = await clientRepository.findOne({
        where: {
            id: clientID
        },
        relations: {
            contacts: true
        }

    })

    if (!clients) {
        return [404, { message: "client not found" }]
    }

    return [200, clients]
}

export const updateClientService = async (clientData: IClientCreationRequest, clientID: string): Promise<any> => {
    const clientRepository = AppDataSource.getRepository(Client)

    const client = await clientRepository.findOne({
        where: {
            id: clientID
        }
    })

    if (!client) {
        return [404, { message: "client not found" }]
    }

    const attClient = await clientRepository.save({ id: clientID, ...clientData })

    return [203, attClient]
}

export const listClientService = async (): Promise<IClientCreationRequest[]> => {
    const clientRepository = AppDataSource.getRepository(Client)

    const clients = await clientRepository.find({
        relations: {
            contacts: true
        }
    })

    return clients
}

export const deleteClientService = async (clientID: string): Promise<any> => {
    const clientRepository = AppDataSource.getRepository(Client)

    const client = clientRepository.findOne({
        where: {
            id: clientID
        }
    })

    if (!client) {
        return [404, { message: "client not found" }]
    }

    clientRepository.delete({ id: clientID })

    return [204]
}