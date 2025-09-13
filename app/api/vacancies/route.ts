import { NextResponse } from "next/server";

import { prisma } from "@/lib/db";
export async function GET() {
  try {
    const vacancies = await prisma.vacancy.findMany({
      where: { isOpen: true },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        createdby: {
          select: {
            email: true,
            Section: true,
    
            Year: true,
            Department: true,
          },
        },
      },
    });
    
    return NextResponse.json(vacancies);
  } catch (err) {
    console.error("Error fetching vacancies:", err);
    return NextResponse.json({ error: "Failed to fetch vacancies" }, { status: 500 });
  }
}