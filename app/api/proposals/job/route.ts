import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:Request){

    try {
        const {jobId}=await req.json();
    
        const proposalsForASpecificJob=prisma.vacancy.findFirst({
            where:{
                id:jobId
            },
            include:{
                proposals:{
                    include:{
                        user:true
                    }
                }
            }
        })
        return NextResponse.json({
            message:"successfull",
            data:proposalsForASpecificJob
        })
        
    } catch (error) {
        console.log("An error occured while getting the proposals for the specific job")
        return NextResponse.json({
            message:"Cannot fetch the users for the proposal"
        })
    }
}