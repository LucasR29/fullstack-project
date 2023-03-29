import express from "express"
import clientsRoutes from "./routes/clients.routes"
import { contactsRoutes } from "./routes/contacts.routes"

export const app = express()

app.use(express.json())


app.use("/clients", clientsRoutes)
app.use("/contacts", contactsRoutes)
