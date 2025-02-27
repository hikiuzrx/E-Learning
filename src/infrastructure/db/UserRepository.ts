import { db } from "../../db.server";
import { User } from "../../domain/User";
import type { Iuser } from '../../interface/repository/IuserRepository';

export class UserRepository implements Iuser{
    constructor(private prisma: typeof db){}

    async save(user: User): Promise<User> {
        console.log("heyy")
        return this.prisma.user.create({data:user})
    }
    async findByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findFirst({where:{email}})
    }
    async findById(id: string): Promise<User | null> {
        return this.prisma.user.findFirst({where:{id}})
    }
    

}