import { updateUserSettings } from "@/action/action";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "your_super_secret_key";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const token = formData.get("token") as string;
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const notificationsEnabled = formData.get("notificationsEnabled") === "true";

    console.log("🔐 Token:", token);
    console.log("📧 Email:", email);
    console.log("🧑 Name:", name);
    console.log("🔔 Notifications:", notificationsEnabled);

    if (!token || !email || !name || !password) {
      console.error("❌ Missing fields");
      return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const userId = decoded.userId;

    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    console.log("✅ User updated:", updatedUser.email);
    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("❌ Update error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

