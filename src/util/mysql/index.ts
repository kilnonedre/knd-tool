import mysql from 'mysql'
import types from './indexType.d'

const query = (
  accountData: types.ConfigAccountData,
  sql: string,
  values?: Array<Number | String>
) => {
  const pool = mysql.createPool(accountData)
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

export default query
