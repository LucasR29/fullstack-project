import { AppDataSource } from "../../data-source";
import Client from "../../entities/client.entity";
import Contact from "../../entities/contact";

import { IContactCreationRequest, IContactEdit } from "../../interfaces/contacts.interface";

export const createContactService = async (contactData: IContactCreationRequest, clientID: string): Promise<IContactCreationRequest> => {
    const contactRepository = AppDataSource.getRepository(Contact)

    const clientRepository = AppDataSource.getRepository(Client)

    const client = await clientRepository.findOneByOrFail({
        id: clientID
    })

    const contact = contactRepository.create(contactData)

    const newClient = await contactRepository.save({
        ...contact,
        client: client
    })

    return newClient
}

export const retrieveContactService = async (contactID: string): Promise<any> => {
    const contactRepository = AppDataSource.getRepository(Contact)

    const contacts = await contactRepository.findOne({
        where: {
            id: contactID
        },
        relations: {
            client: true
        }

    })

    if (!contacts) {
        return [404, { message: "contact not found" }]
    }

    return [200, contacts]
}

export const updateContactService = async (contactData: IContactEdit, contactID: string): Promise<any> => {
    const contactRepository = AppDataSource.getRepository(Contact)

    const contact = await contactRepository.findOne({
        where: {
            id: contactID
        }
    })

    if (contactData.full_name?.length === 0) {
        delete contactData['full_name']
    }

    if (contactData.email?.length === 0) {
        delete contactData['email']
    } else {
        const validate = await contactRepository.findOneBy({
            email: contactData.email!
        })

        if (validate) {
            return [409, { message: "email already in use in this list" }]
        }
    }

    if (contactData.phone_number?.length === 0) {
        delete contactData['phone_number']
    }

    if (!contact) {
        return [404, { message: "contact not found" }]
    }

    const attcontact = await contactRepository.save({ id: contactID, ...contactData })

    return [203, attcontact]
}

export const listContactByClientService = async (clientID: string): Promise<IContactCreationRequest[]> => {
    const contactRepository = AppDataSource.getRepository(Contact)
    const clientRepository = AppDataSource.getRepository(Client)

    const client = await clientRepository.findOneByOrFail({ id: clientID })

    const contacts = await contactRepository.find({
        where: {
            client: client
        }
    })

    return contacts
}

export const deletecontactService = async (contactID: string): Promise<any> => {
    const contactRepository = AppDataSource.getRepository(Contact)

    const contact = contactRepository.findOne({
        where: {
            id: contactID
        }
    })

    if (!contact) {
        return [404, { message: "contact not found" }]
    }

    contactRepository.delete({ id: contactID })

    return [204]
}