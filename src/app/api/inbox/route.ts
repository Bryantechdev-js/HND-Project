// app/api/inbox/route.ts
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/db";

const JWT_SECRET = process.env.JWT_SECRET || "your_super_secret_key";

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ error: "Missing token" }, { status: 401 });
    }

    const token = authHeader.replace("Bearer ", "");
    const decoded: any = jwt.verify(token, JWT_SECRET);
    const userId = decoded.userId;

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const emails = await prisma.email.findMany({
        where: { to: user.email },
        orderBy: { date: "desc" }, // Sort by custom date field
      });
      

    return NextResponse.json({ emails });
  } catch (error) {
    console.error("Inbox Fetch Error:", error);
    return NextResponse.json({ error: "Unauthorized or invalid token" }, { status: 401 });
  }
}
