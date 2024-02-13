import { client } from "..";

/*
 * Should insert into the users table
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export async function createUser(username: string, password: string, name: string) {

    const insertIntoUserTable = `
       INSERT INTO users (username, password, name)
       VALUES ($1, $2, $3)
    `
    const userData = [username, password, name]
    const result = await client.query(insertIntoUserTable, userData)

    return result.rows[0]

   
}

/*
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export async function getUser(userId: number) {

    const selectUserFromTable = `
       SELECT * FROM users
       WHERE id = $1
    `

    const userData = [userId]

    const result = await client.query(selectUserFromTable, userData)

    return result.rows[0]
    
}


