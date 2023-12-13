import databaseList from '@/config/mysql/index.json'

export type ConfigDatabase = keyof typeof databaseList

export interface ConfigTable {
  TABLE_NAME: string
}

export interface ConfigParams {
  database: ConfigDatabase
}
