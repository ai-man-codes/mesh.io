import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Zap, Target, ArrowRight } from "lucide-react"
import { CrowdCanvas } from "@/components/ui/skiper-ui/skiper39"

export default function HomePage() {
  return (
    <>
      <div className="bg-background w-full h-screen">
        <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
          <CrowdCanvas src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/175711/open-peeps-sheet.png" rows={15} cols={7} />
        </div>
        {/* Navigation */}
        <nav className="border-b border-border bg-card/50 backdrop-blur-sm">
          <div className=" mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground">Mesh</span>
              </div>
              <div className="flex items-center gap-4">
                <Link href="/signin">
                  <button className="text-white px-6 cursor-pointer rounded-full py-2 bg-primary hover:bg-transparent hover:text-primary hover:border-primary border border-primary transition-all duration-300">
                    Sign In
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </nav>

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
          </div>
        </div>

      </div>
    </>
  )
}