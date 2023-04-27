export interface IClientCreationRequest {
    full_name: string
    email: string
    phone_number: string
    password: string
}

export interface IClientEdit {
    full_name?: string
    email?: string
    phone_number?: string
    password?: string
}


export interface IClientCreationResponse {
    id: string
    full_name: string
    email: string
    phone_number: string | undefined
}

export interface IUserRequest {
    email: string,
    password: string
}