import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  try {
    const { isAuthenticated } = await auth();
    if (!isAuthenticated) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }

    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }

    const { Department, Section, Year } = await req.json();

    const updatedUser = await prisma.user.update({
      where: { email: user.primaryEmailAddress?.emailAddress },
      data: {
        Department,
        Section,
        Year,
      },
    });

    return NextResponse.json({
      message: "successful",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error in /api/user/edit:", error);
    return NextResponse.json(
      { message: "Cannot update the user" },
      { status: 500 }
    );
  }
}
