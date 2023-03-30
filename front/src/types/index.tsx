export interface Clients {
    id: string,
    full_name: string,
    email: string,
    phone_number: string,
    createdAt: string,
    contacts: Contacts[]

}

interface Contacts {
    id: string,
    full_name: string,
    email: string,
    phone_number: string,
    createdAt: string,
}

