import { Router } from "express";
import { createClientController, deleteClientController, listClientsController, retrieveClientController, updateClientController } from "../controllers/clients.controllers";
import { checkUUID } from "../middlewares/checkUUID.middleware";
import { ensureDataIsValidMiddleware } from "../middlewares/endsureDataIsValid.middleware";
import { verifyClientEmailMiddleware } from "../middlewares/verifyClientEmail.middleware";
import { clientSchema, updateClientSchema } from "../schemas/clientsSchemas/createCliente.schema";

const clientsRoutes = Router()

clientsRoutes.get("", listClientsController)
clientsRoutes.get("/:id", checkUUID(), retrieveClientController)
clientsRoutes.post("", ensureDataIsValidMiddleware(clientSchema), verifyClientEmailMiddleware(), createClientController)
clientsRoutes.delete("/:id", checkUUID(), deleteClientController)
clientsRoutes.patch("/:id", checkUUID(), ensureDataIsValidMiddleware(updateClientSchema), updateClientController)


export default clientsRoutes