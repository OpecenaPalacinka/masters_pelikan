import {PoolClient} from 'pg'


export type CustomContext = {
  dbConnection: PoolClient
  auth: string | string[]
}

