import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Zap, Target, ArrowRight } from "lucide-react"
import { CrowdCanvas } from "@/components/ui/skiper-ui/skiper39"

export default function HomePage() {
  return (
    <>
      <div className="bg-background w-full">
        <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
          <CrowdCanvas src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/175711/open-peeps-sheet.png" rows={15} cols={7} />
        </div>
        {/* Navigation */}


        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center">
          <div className="mt-40 mb-12">
            <h1 className="text-8xl font-bold text-foreground mb-4">Find your People !</h1>
          </div>
          <div className="flex justify-center gap-4">
            <Link href="/lookout">
              <button className="text-foreground px-12 cursor-pointer rounded-full py-4 text-2xl border-2 border-foreground hover:bg-foreground hover:text-background transition-all duration-300">
                Get Started
              </button>
            </Link>
            <Link href='/event'>
              <button className="text-background px-12 cursor-pointer rounded-full py-4 text-2xl border-2 bg-foreground border-foreground hover:bg-background hover:text-foreground transition-all duration-300">
                Events
              </button>
            </Link>
          </div>
        </div>

      </div>
    </>
  )
}