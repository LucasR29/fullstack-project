import { Router } from "express";
import { createContactController, deleteContactController, listContactsByClientController, retrieveContactController, updateContactController } from "../controllers/contacts.controllers";
import { checkUUID } from "../middlewares/checkUUID.middleware";
import { ensureDataIsValidMiddleware } from "../middlewares/endsureDataIsValid.middleware";
import { verifyContactEmailMiddleware } from "../middlewares/verifyContactEmailByClient.middleware";
import { updateClientSchema } from "../schemas/clientsSchemas/createCliente.schema";
import { contactSchema } from "../schemas/contactsSchemas/createContact.schema";

export const contactsRoutes = Router()


contactsRoutes.get("/:id", checkUUID(), listContactsByClientController)
contactsRoutes.get("", retrieveContactController)
contactsRoutes.post("/:id", checkUUID(), ensureDataIsValidMiddleware(contactSchema), verifyContactEmailMiddleware(), createContactController)
contactsRoutes.delete("/:id", checkUUID(), deleteContactController)
contactsRoutes.patch("/:id", checkUUID(), ensureDataIsValidMiddleware(updateClientSchema), updateContactController)

