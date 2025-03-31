import { prisma } from '@/lib/db';

export async function getUserEmails(userEmail: string) {
  if (!userEmail) {
    throw new Error("Invalid user email provided");
  }

  return await prisma.email.findMany({
    where: {
      to: userEmail, // Direct comparison instead of `contains`
    },
    // orderBy: { createdAt: 'desc' }, // Optional: Order by latest emails
  });
}

