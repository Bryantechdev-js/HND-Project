import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Sentiment from "sentiment";

const JWT_SECRET = process.env.JWT_SECRET || "your_super_secret_key";
const sentiment = new Sentiment();

export async function POST(req: Request) {
  try {
    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded: any = jwt.verify(token, JWT_SECRET);
    const userId = decoded.userId;

    // Get user info (including email)
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { startDate, endDate, email } = await req.json();

    // Build the filters object
    const filters: any = {
      OR: [
        { from: user.email },
        { to: user.email },
        { cc: user.email },
        { bcc: user.email },
      ],
    };

    if (startDate) filters.timestamp = { gte: new Date(startDate) };
    if (endDate) filters.timestamp = { ...filters.timestamp, lte: new Date(endDate) };
    if (email) filters.receiverEmail = email;

    // Get emails related to this user with filters
    const emails = await prisma.email.findMany({
      where: filters,
    });

    // Count sent and received emails
    const sentCount = emails.filter((e) => e.from === user.email).length;
    const receivedCount = emails.filter((e) => e.to === user.email).length;

    // Sentiment analysis
    let sentimentScores = { positive: 0, neutral: 0, negative: 0 };
    emails.forEach((email) => {
      const result = sentiment.analyze(email.body || "");
      if (result.score > 1) sentimentScores.positive++;
      else if (result.score < -1) sentimentScores.negative++;
      else sentimentScores.neutral++;
    });

    // Format data for frontend charts
    const sentReceivedData = [
      { label: "Sent", Sent: sentCount, Received: 0 },
      { label: "Received", Sent: 0, Received: receivedCount },
    ];

    const sentimentData = [
      { name: "Positive", value: sentimentScores.positive },
      { name: "Neutral", value: sentimentScores.neutral },
      { name: "Negative", value: sentimentScores.negative },
    ];

    return NextResponse.json({
      success: true,
      analytics: {
        sentReceivedData,
        sentimentData,
      },
    });
  } catch (error) {
    console.error("Email analytics error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
