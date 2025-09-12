import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const {  role, description, vacantTill } = await req.json();
    console.log("the log descripton and vacant till are ",role,description,vacantTill);
    if (!role) {
      return NextResponse.json(
        { error: "teamId and role are required" },
        { status: 400 }
      );
    }

    const vacancy = await prisma.vacancy.create({
      data: {
        role,
        vacantTill,
        description,
        isOpen: true,
      },
    });

    return NextResponse.json(vacancy);
  } catch (err) {
    console.error("Error creating vacancy:", err);
    return NextResponse.json({ error: "Failed to create vacancy" }, { status: 500 });
  }
}
