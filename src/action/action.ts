"use server"

import { prisma } from "@/lib/db"

export const creatEmails=async(formData:FormData)=>{
        await prisma.email.create({
            data:{
                from:"bryantech",
                to:formData.get("to") as string,
                subject:formData.get("subject") as string,
                body:formData.get("message") as string
            }
        })
}


export const deleateEmails= async(id:string)=>{
    await prisma.email.delete({
        where:{
            id
        }
    })

}