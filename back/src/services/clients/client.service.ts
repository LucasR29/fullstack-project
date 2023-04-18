import { hashSync } from "bcryptjs";
import { AppDataSource } from "../../data-source";
import Client from "../../entities/client.entity";
import { AppError } from "../../errors/appError";
import { IClientCreationRequest, IClientCreationResponse } from "../../interfaces/clients.interface";
import { clientResSchema } from "../../schemas/clientsSchemas/createCliente.schema";

export const createClientService = async (clientData: IClientCreationRequest): Promise<IClientCreationResponse> => {
    const clientRepository = AppDataSource.getRepository(Client)

    const exists = await clientRepository.exist({
        where: { email: clientData.email }
    })



    const client = clientRepository.create(clientData)

    client.password = hashSync(clientData.password, 10)

    const newClient = await clientRepository.save({
        ...client,
    })

    const userWithoutPassword = await clientResSchema.validate(newClient, { stripUnknown: true })

    return userWithoutPassword
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