import * as yup from "yup"
import { SchemaOf } from "yup"
import { IContactCreationRequest } from "../../interfaces/contacts.interface";

export const contactSchema: SchemaOf<IContactCreationRequest> = yup.object().shape({
    full_name: yup.string().required(),
    email: yup.string().required(),
    phone_number: yup.string().required(),
})