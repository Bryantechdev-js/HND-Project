import { prisma } from '@/lib/db';

export async function getLoggedInUser() {
  const user = await prisma.user.findMany({
    where: { login: true },
  });

  console.log(user)

  return user; // Returns `null` if no logged-in user
}
