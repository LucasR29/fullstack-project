export interface IContactCreationRequest {
    full_name: string
    email: string
    phone_number: string
}

export interface IContactEdit {
    full_name?: string
    email?: string
    phone_number?: string
}

interface IAdicionalContactInfo {
    email?: string
    phone_number?: string
}