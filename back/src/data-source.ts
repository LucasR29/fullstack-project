import 'dotenv/config'
import path from "path"
import 'reflect-metadata'
import { DataSource, DataSourceOptions } from 'typeorm'
import Client from './entities/client.entity'
import Contact from './entities/contact'
import { InicialMigration1682624471980 } from './migrations/1682624471980-InicialMigration'

const dataSourceConfig = (): DataSourceOptions => {
    // const entitiesPath: string = path.join(__dirname, './entities/**.{ts,js}')
    // const migrationsPath: string = path.join(__dirname, './migrations/**.{ts,js}')

    const dbUrl: string | undefined = process.env.DATABASE_URL

    if (!dbUrl) throw new Error("Missing env var: 'DATABSE_URL'")

    const nodeEnv: string | undefined = process.env.NODE_ENV

    let sourceOp: DataSourceOptions = {
        type: 'sqlite',
        database: path.join(__dirname, '/sqlite3.db'),
        synchronize: true,
        entities: [Client, Contact]
    }

    nodeEnv === 'test' ? (
        sourceOp = {
            type: 'sqlite',
            database: path.join(__dirname, '/sqlite3.db'),
            synchronize: true,
            entities: [Client, Contact]
        }
    ) : (
        sourceOp = {
            type: 'postgres',
            url: dbUrl,
            synchronize: false,
            logging: true,
            entities: [Client, Contact],
            migrations: [InicialMigration1682624471980]
        }
    )

    return sourceOp

}

export const AppDataSource = new DataSource(dataSourceConfig())