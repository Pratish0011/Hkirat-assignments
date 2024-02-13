import { client } from "..";
/*
 * Function should insert a new todo for this user
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
export async function createTodo(userId: number, title: string, description: string) {

    const insertIntoTodoTable = `
         INSERT INTO todos (user_id, title, description, done)
         VALUES ($1, $2, $3, $4) RETURNING *
    `

    const todoData = [userId, title, description, false]

    const result = await client.query(insertIntoTodoTable, todoData)

    return result.rows[0]
    
}
/*
 * mark done as true for this specific todo.
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
export async function updateTodo(todoId: number) {

    const updateTodoTable = `
        UPDATE todos
        SET done = $1
        WHERE id = $2
        RETURNING *
    `

    const todoData = [true, todoId]

    const result = await client.query(updateTodoTable, todoData)

    return result.rows[0]

}

/*
 *  Get all the todos of a given user
 * Should return an array of todos
 * [{
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }]
 */
export async function getTodos(userId: number) {

    const getTodoFromTable = `
        SELECT * FROM todos WHERE user_id = $1
    `

    const todoData = [userId]

    const result = await client.query(getTodoFromTable, todoData)

    return result.rows

}