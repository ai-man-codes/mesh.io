import { NextResponse } from "next/server";

import { currentUser } from "@clerk/nextjs/server";

import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const user = await currentUser();

    if (!user) {
      // not logged in
      return NextResponse.redirect(new URL("/signin"));
    }

    const userInDb = await prisma.user.findUnique({
      where: {
        email: user.emailAddresses[0]?.emailAddress, // safer than .toString()
      },
    });

    if (userInDb) {
      return NextResponse.redirect(new URL("/"));
    } else {
      return NextResponse.redirect(new URL("/signup"));
    }
  } catch (err) {
    console.error("Error checking user:", err);
    return NextResponse.redirect(new URL("/signin"));
  }
}