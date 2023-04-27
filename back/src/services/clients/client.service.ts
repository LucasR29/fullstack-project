import { hashSync } from "bcryptjs";
import { AppDataSource } from "../../data-source";
import Client from "../../entities/client.entity";
import { AppError } from "../../errors/appError";
import { IClientCreationRequest, IClientCreationResponse, IClientEdit } from "../../interfaces/clients.interface";
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

export const updateClientService = async (clientData: IClientEdit, clientID: string): Promise<any> => {
    const clientRepository = AppDataSource.getRepository(Client)

    const client = await clientRepository.findOne({
        where: {
            id: clientID
        }
    })

    if (!client) {
        return [404, { message: "client not found" }]
    }

    if (clientData.full_name?.length === 0) {
        delete clientData['full_name']
    }

    if (clientData.email?.length === 0) {
        delete clientData['email']
    } else {
        const validate = await clientRepository.findOneBy({
            email: clientData.email!
        })

        if (validate) {
            return [409, { message: "email already in use" }]
        }
    }

    if (clientData.password?.length === 0) {
        delete clientData['password']
    }

    if (clientData.phone_number?.length === 0) {
        delete clientData['phone_number']
    } else {
        clientData.password = hashSync(clientData.password!, 10)
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

    const client = await clientRepository.findOne({
        where: {
            id: clientID
        }
    })

    if (!client) {
        return [404, { message: "client not found" }]
    }

    await clientRepository.delete({ id: clientID })

    return [204]
}