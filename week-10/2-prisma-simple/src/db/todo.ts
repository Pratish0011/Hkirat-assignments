import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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

    const create = await prisma.todo.create({
        data:{
            userId,
            title,
            description,
            done : false
        },
        select:{
            id: true,
            title: true,
            description: true,
            done: true
        }
    })

    return create
    
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

    const update = await prisma.todo.update({
        where:{
            id: todoId
        },
        data:{
            done: true
        },
        select:{
            title: true,
            description: true,
            done: true,
            id: true
        }
    })

    return update

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

    const get = await prisma.todo.findMany({
        where:{
            userId
        }
    })


    return get

}