import { NextResponse } from "next/server";

import { prisma } from "@/lib/db";
export async function POST(req: Request) {
  try {
    const { teamId, role, description } = await req.json();

    if (!teamId || !role) {
      return NextResponse.json({ error: "teamId and role are required" }, { status: 400 });
    }

    const vacancy = await prisma.vacancy.create({
      data: {
        teamId,
        role,
        description: description || "",
      },
    });

    return NextResponse.json(vacancy);
  } catch (err) {
    console.error("Error creating vacancy:", err);
    return NextResponse.json({ error: "Failed to create vacancy" }, { status: 500 });
  }
}