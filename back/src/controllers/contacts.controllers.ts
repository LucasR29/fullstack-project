import { Request, Response } from "express"
import { IContactCreationRequest } from "../interfaces/contacts.interface"
import { createContactService, deletecontactService, listContactByClientService, retrieveContactService, updateContactService } from "../services/contacts/contact.service"

export const createContactController = async (request: Request, response: Response) => {
    const contactData: IContactCreationRequest = request.body
    const newContact = await createContactService(contactData, request.params.id)

    return response.status(201).json(newContact)
}

export const listContactsByClientController = async (request: Request, response: Response) => {
    const contacts: IContactCreationRequest[] = await listContactByClientService(request.params.id)

    return response.status(200).json(contacts)
}

export const retrieveContactController = async (request: Request, response: Response) => {
    const [status, message]: any = await retrieveContactService(request.params.id)

    return response.status(status).json(message)
}

export const deleteContactController = async (request: Request, response: Response) => {
    const [status, message]: any = await deletecontactService(request.params.id)

    return response.status(status).json(message)
}

export const updateContactController = async (request: Request, response: Response) => {
    const [status, message]: any = await updateContactService(request.body, request.params.id)

    return response.status(status).json(message)
}