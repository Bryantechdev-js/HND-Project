"use server"

import { prisma } from "@/lib/db"
import bcrypt from "bcryptjs";
import { toast } from "react-toastify";




export const creatEmails=async(formData:FormData)=>{
      
        await prisma.email.create({
            data:{
                from:"bryan tech@gmail.com",
                to:formData.get("to") as string,
                subject:formData.get("subject") as string,
                body:formData.get("message") as string
            }
        })
}

export const creatUser=async(formData:FormData)=>{
    const name=formData.get("name") as string
    const email=formData.get("email") as string
    const password=formData.get("password") as string
    const userPassword =await bcrypt.hash(password,10)
        await prisma.user.create({
            data:{
                name:name,
                email:email,
                password:userPassword,
            }
        })

        toast("account created")
}



export const deleateEmails= async(id:string)=>{
    await prisma.email.delete({
        where:{
            id
        }
    })

}