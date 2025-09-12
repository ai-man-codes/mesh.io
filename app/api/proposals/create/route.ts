import { NextResponse } from "next/server";

import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { vacancyId, userId, message } = await req.json();
    console.log("hey from the server side")
    console.log("The  vacancy id and user id are ",vacancyId,userId)
    if (!vacancyId || !userId) {
      return NextResponse.json({ error: "vacancyId and userId are required" }, { status: 400 });
    }

    const proposal = await prisma.proposal.create({
      data: {
        vacancyId,
        userId,
        message: message || "",
        createdAt:new Date().toISOString()
      },
    });

    return NextResponse.json(proposal);
  } catch (err) {
    console.error("Error creating proposal:", err);
    return NextResponse.json({ error: "Failed to create proposal" }, { status: 500 });
  }
}