import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const { userId } =await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const vacancies = await prisma.vacancy.findMany({
      where: { id: userId },
      orderBy: {
        createdAt: "desc",
      },
    });
    console.log("the vaccannices are ",vacancies)
    return NextResponse.json({
      message: "Success",
      data: vacancies,
    });
  } catch (err) {
    console.error("Error fetching user-created vacancies:", err);
    return NextResponse.json({ error: "Failed to fetch user-created vacancies" }, { status: 500 });
  }
}
