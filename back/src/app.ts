import express from "express"
import clientsRoutes from "./routes/clients.routes"
import { contactsRoutes } from "./routes/contacts.routes"
import cors from 'cors'


export const app = express()


app.use(cors())
app.use(express.json())


app.use("/clients", clientsRoutes)
app.use("/contacts", contactsRoutes)
