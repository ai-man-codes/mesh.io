import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";

export async function GET(req:Request){

    try {
        const user=await currentUser()
    
        const usersProposals=await prisma.user.findFirst({
            where:{
                 email:user?.emailAddresses.toString()
            },
            include:{
                proposals:true
            }
        })

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