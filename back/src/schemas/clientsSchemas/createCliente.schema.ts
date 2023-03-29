import * as yup from "yup"
import { SchemaOf } from "yup"
import { IClientCreationRequest } from "../../interfaces/clients.interface"


export const clientSchema: SchemaOf<IClientCreationRequest> = yup.object().shape({
    full_name: yup.string().required(),
    email: yup.string().required(),
    phone_number: yup.string().required(),
})

export const updateClientSchema = yup.object().shape({
    full_name: yup.string().notRequired(),
    email: yup.string().notRequired(),
    phone_number: yup.string().notRequired(),
})