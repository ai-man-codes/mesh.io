import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  try {
    const { isAuthenticated } = await  auth();
    if (!isAuthenticated) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }

    const user = await currentUser();
    console.log("Current user:", user?.primaryEmailAddress?.emailAddress);

    const { email } = await req.json(); // body from fetch
    console.log("Email from body:", email);

    const usersDb = await prisma.user.findFirst({
      where: { email },
    });

    return NextResponse.json({
      message: "successful",
      data: usersDb,
    });
  } catch (error) {
    console.error("Error in /api/user:", error);
    return NextResponse.json(
      { message: "Cannot fetch the proposals for the user" },
      { status: 500 }
    );
  }
}
