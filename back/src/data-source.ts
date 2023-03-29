import 'dotenv/config'
import path from "path"
import 'reflect-metadata'
import { DataSource, DataSourceOptions } from 'typeorm'
import Client from './entities/clients/client.entity'
import Contact from './entities/contacts/contact'
import { InicialMigration1680015625463 } from './migrations/1680015625463-InicialMigration'

const dataSourceConfig = (): DataSourceOptions => {
    // const entitiesPath: string = path.join(__dirname, './entities/**/**.{ts,js}')
    // const migrationsPath: string = path.join('./migrations/**.{ts,js}')

    const dbUrl: string | undefined = process.env.DATABASE_URL

    if (!dbUrl) throw new Error("Missing env var: 'DATABSE_URL'")

    const nodeEnv: string | undefined = process.env.NODE_ENV

    if (nodeEnv === 'test') {
        return {
            type: 'sqlite',
            database: ':memory:',
            synchronize: true,
            entities: [Client, Contact]
        }
    }

    return {
        type: 'postgres',
        url: dbUrl,
        synchronize: false,
        logging: true,
        entities: [Client, Contact],
        migrations: [InicialMigration1680015625463]
    }
}

export const AppDataSource = new DataSource(dataSourceConfig())