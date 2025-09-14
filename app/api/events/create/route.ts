import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";

const allowedEmails = ["user1@gmail.com", "user2@gmail.com", "aimansingh00@gmail.com"]; // Replace with your list of allowed emails

export async function POST(req: Request) {
  try {
    // const { userId } = auth();
    const user = await currentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const email = user.emailAddresses[0]?.emailAddress;

    if (!email || !allowedEmails.includes(email)) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const body = await req.json();
    const { name, description, start_date, end_date, image_url } = body;

    const event = await prisma.event.create({
      data: {
        name,
        description,
        start_date,
        end_date,
        image_url,
      },
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error("[EVENTS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}