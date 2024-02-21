import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


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

    const create = await prisma.user.create({
        data:{
            username,
            password,
            name
        },
        select:{
            id: true,
            username : true,
            password: true,
            name: true
        }
    })

    return create
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

    const get = await prisma.user.findFirst({
        where:{
            id: userId
        },
        select:{
            id: true,
            username : true,
            password: true,
            name: true
        }
    })

    return get
    
}
