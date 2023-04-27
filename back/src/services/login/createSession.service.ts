import { string } from "yup";
import 'dotenv/config'
import { IUserRequest } from "../../interfaces/clients.interface";
import { AppDataSource } from "../../data-source";
import Client from "../../entities/client.entity";
import { compare } from "bcryptjs";
import { AppError } from "../../errors/appError";
import jwt from 'jsonwebtoken'

export const createSessionService = async ({
    email, password
}: IUserRequest): Promise<any> => {
    const userRepository = AppDataSource.getRepository(Client)

    const user = await userRepository.findOneBy({
        email: email
    })

    if (!user) {
        return ['email not found', 404]
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
        return ['Invalid password', 404]
    }

    const token = jwt.sign(
        {
            email: email,
            id: user.id,
            full_name: user.full_name,
            phone_number: user.phone_number
        },
        process.env.SECRET_KEY!,
        {
            subject: user.id
        }
    )

    return [token, 200]
}