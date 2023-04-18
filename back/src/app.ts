import express from "express"
import clientsRoutes from "./routes/clients.routes"
import { contactsRoutes } from "./routes/contacts.routes"
import cors from 'cors'
import handleError from "./errors/handleError"
import { loginRoutes } from "./routes/login.routes"

export const app = express()

app.use(cors())
app.use(express.json())
app.use(handleError)

app.use("/clients", clientsRoutes)
app.use("/contacts", contactsRoutes)
app.use("/login", loginRoutes)
