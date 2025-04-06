import { prisma } from "./db"

export const getId=async(email:string)=>{
     return await prisma.user.findUnique({
        where:{
            email:email
        }
     })
}