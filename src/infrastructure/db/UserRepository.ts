import { PrismaClient } from "@prisma/client";
import { User } from "../../domain/User";
import type { Iuser } from '../../interface/repository/Iuser';

export class UserRepository implements Iuser{
    constructor(private prisma: PrismaClient){}

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