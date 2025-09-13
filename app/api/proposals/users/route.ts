import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";

export async function GET(req:Request){

    try {
        const user=await currentUser()
        // console.log("the user from the proposals are route is ",user)
        const usersProposals=await prisma.user.findFirst({
            where:{
                 email:user?.emailAddresses[0].emailAddress.toString()
            },
            include:{
                proposals:true
            }
        })

        console.log("the user proposals are ",usersProposals)
        return NextResponse.json({
            message:"successfull",
            data:usersProposals
        })
        
    } catch (error) {
        console.log("An error occured while getting the proposals for the specific user")
        return NextResponse.json({
            message:"Cannot fetch the proposals for the user "
        })
    }
}