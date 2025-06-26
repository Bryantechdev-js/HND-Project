import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/db";

const JWT_SECRET = process.env.JWT_SECRET || "your_super_secret_key";

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decoded: any = jwt.verify(token, JWT_SECRET);
    const userId = decoded.userId;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get emails sent by the user (filter by `send: true` to ensure they are actually sent)
    const emails = await prisma.email.findMany({
      where: {
        from: user.email,  // Ensure the email is from the logged-in user
        send: true,        // Only fetch emails that were sent
      },
      orderBy: {
        date: "desc",
      },
      select: {
        id: true,
        to: true,
        subject: true,
        body: true,
        date: true,
      },
    });

    // Rename `date` to `sentAt` for frontend
    const formatted = emails.map(email => ({
      ...email,
      sentAt: email.date,
    }));

    return NextResponse.json({ emails: formatted });
  } catch (error) {
    console.error("Error fetching sent emails:", error);
    return NextResponse.json({ error: "Failed to fetch sent emails" }, { status: 500 });
  }
}
