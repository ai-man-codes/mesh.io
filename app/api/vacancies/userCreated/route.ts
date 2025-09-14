import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
export async function POST(req:NextRequest) {
  try {
    // const { userId } =await auth();
    // // const user=await currentUser()
    // if(!user?.emailAddresses[0].emailAddress){
    //   return new NextResponse("Un")
    // }
  
    const {userId}=await req.json()
    // console.log("r3222222222222222",userId);
    const vacancies = await prisma.vacancy.findMany({
      where: { userId},
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
