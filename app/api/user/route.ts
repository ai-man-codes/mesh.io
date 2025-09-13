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
    if(!user){
        return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }
    if(!user.primaryEmailAddress?.emailAddress){
        return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }
    let usersDb = await prisma.user.findFirst({
      where: { email:user?.primaryEmailAddress?.emailAddress },
    });
    console.log("user from db is ",usersDb)
    if(!usersDb){
        usersDb=await prisma.user.create({
            data:{
                email:user?.primaryEmailAddress?.emailAddress,
                name:user?.firstName,
                createdAt:new Date().toISOString(),
                updatedAt:new Date().toISOString(),
            }
        })
    }
    return NextResponse.json({
      message: "successful",
      data: usersDb?.id,
    });
  } catch (error) {
    console.error("Error in /api/user:", error);
    return NextResponse.json(
      { message: "Cannot fetch the proposals for the user" },
      { status: 500 }
    );
  }
}
