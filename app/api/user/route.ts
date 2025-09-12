import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";

export async function GET(req:Request){

    try {
        console.log("this route triggered")
        const {email}=await req.json();
    
        const usersDb=await prisma.user.findFirst({
            where:{
                 email:email
            },
        })

        return NextResponse.json({
            message:"successfull",
            data:usersDb
        })
        
    } catch (error) {
        console.log("An error occured while getting the proposals for the specific user")
        return NextResponse.json({
            message:"Cannot fetch the proposals for the user "
        })
    }
}