import mysql from 'mysql'

const createAccount = (database: string) =>
  mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'nmdzz000',
    database,
  })

const query = (
  pool: mysql.Pool,
  sql: string,
  values?: Array<Number | String>
) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) reject(err)
      else {
        connection.query(sql, values, (err, result) => {
          connection.release()
          if (err) reject(err)
          else resolve(result)
        })
      }
    })
  })
}

const kndToolPool = createAccount('knd_tool')

export const kndToolQuery = (sql: string, values?: Array<any>) =>
  query(kndToolPool, sql, values)
