// /api/email/route.ts (or wherever you're creating/sending emails)
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/db";

const JWT_SECRET = process.env.JWT_SECRET || "your_super_secret_key";

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decoded: any = jwt.verify(token, JWT_SECRET);
    const userId = decoded.userId;

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const body = await req.json();
    const { to, cc, bcc, subject, body: emailBody } = body;

    const email = await prisma.email.create({
      data: {
        from: user.email,
        to,
        cc,
        bcc,
        subject,
        body: emailBody,
        send: true,          // ✅ This is the key fix
        recieve: true,
      },
    });

    return NextResponse.json({ email });
  } catch (error) {
    console.error("Send email error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
