"use server"

import { prisma } from "@/lib/db"
import { getId } from "@/lib/getUserId";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { toast } from "react-toastify";
import jwt from "jsonwebtoken";



// action.js
export const creatEmails = async (formData: FormData) => {
  const from = formData.get("from") as string;
  const to = formData.get("to") as string;
  const subject = formData.get("subject") as string;
  const body = formData.get("message") as string;

  try {
    const success = await prisma.email.create({
      data: {
        from,
        to,
        subject,
        body,
      },
    });

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};




// app/actions/user.ts




export const updateUserSettings = async (formData: FormData) => {
  const token = formData.get("token") as string;

  if (!token) throw new Error("Unauthorized");

  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
  const userId = decoded.id;

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const notificationsEnabled = formData.get("notificationsEnabled") === "true";

  await prisma.user.update({
    where: { id: userId },
    data: {
      name,
      email,
      password,
      login: true,
      updated: new Date(),
      // You can store `notificationsEnabled` in your schema if you add the field
    },
  });

  return { success: true };
};

  




export async function registerUser(formData: FormData) {
  try {
    // Extract values from FormData
    const name = formData.get("name")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const password = formData.get("password")?.toString();

    // Validate input
    if (!name || !email || !password) {
      return { error: "All fields are required." };
    }

    // Check if email is already in use
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return { error: "Email already in use. Please try another email." };
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    // Generate a session token (for real apps, use JWT)
    const sessionToken = `session_${newUser.id}_${Date.now()}`;


    const cookieStore = await cookies(); 
    cookieStore.set("auth_token", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return { success: "Registration successful. Redirecting..." };
  } catch (error) {
    console.error("Registration Error:", error);
    return { error: "Something went wrong. Please try again later." };
  }
}
 


export const logoutUsers=async(id:string,data:Object)=>{
      await prisma.user.update({
        where:{
            id:id
        },
        data:{
           
        }
      })
}



export const deleateEmails= async(id:string)=>{
    const deleatedEmails=await prisma.email.delete({
        where:{
            id
        }
    })

    if(! deleatedEmails){
        toast("could not deleate email")
    }
    toast("emails deleated")

}