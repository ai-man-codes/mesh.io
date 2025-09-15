"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Users,
  Calendar,
  Search,
  Plus,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
  MapPin,
  Clock,
  User,
  Zap,
  Target,
} from "lucide-react"

export default function DashboardPage() {
  const [notifications] = useState(3)
  const [vacancies, setVacancies] = useState([])
  const [proposals, setProposals] = useState([])
  const [user, setUser] = useState<any>(null)
  const { user: clerkUser } = useUser()
  const [department, setDepartment] = useState("")
  const [section, setSection] = useState("")
  const [year, setYear] = useState("")
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  useEffect(() => {
    const fetchVacancies = async () => {
        const request=(await(await fetch("/api/user",{
            method:"GET",
            headers:{
              "Content-Type":"application/json"
            },
          })).json()).data.id
      console.log("User ID: ", request)
      const res = await fetch("/api/vacancies/userCreated",{
        method:"POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: request,
        }),
      })
      const data = await res.json()
      console.log("Vacancies data: ", data)
      setVacancies(data.data)
      console.log("the vacancies ffrom the state is ",vacancies)
      
      
    }
    const fetchUser = async () => {
      const res = await fetch("/api/user")
      const data = await res.json()
      setUser(data.data)
      setDepartment(data.data.Department || "")
      setSection(data.data.Section || "")
      setYear(data.data.Year || "")
    }

    const fetchProposals = async () => {
      const res = await fetch("/api/proposals/users")
      const data = await res.json()
      console.log("Proposals data: ", data)
      setProposals(data.data.proposals)
    }

    fetchVacancies()
    fetchProposals()
    fetchUser()
  }, [])

  const handleProfileUpdate = async () => {
    const res = await fetch("/api/user/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Department: department,
        Section: section,
        Year: year,
      }),
    })
    const data = await res.json()
    setUser(data.data)
    setIsEditDialogOpen(false)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, {clerkUser?.fullName}!</h1>
          <p className="text-muted-foreground">Ready to connect with amazing teams and build something incredible?</p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Link href="/lookout">
            <Card className="border-border bg-card hover:shadow-lg transition-all cursor-pointer group">
              <CardHeader className="pb-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors">
                  <Search className="w-5 h-5 text-primary" />
                </div>
                <CardTitle className="text-lg text-foreground">Find Teammates</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Discover talented students for your next project
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/event">
            <Card className="border-border bg-card hover:shadow-lg transition-all cursor-pointer group">
              <CardHeader className="pb-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <CardTitle className="text-lg text-foreground">Browse Events</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Find hackathons and competitions to join
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/create-job">
            <Card className="border-border bg-card hover:shadow-lg transition-all cursor-pointer group">
              <CardHeader className="pb-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors">
                  <Plus className="w-5 h-5 text-primary" />
                </div>
                <CardTitle className="text-lg text-foreground">Post Opportunity</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Create a team or find specific roles
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
                <Target className="w-5 h-5 text-primary" />
              </div>
              <CardTitle className="text-lg text-foreground">Your Profile</CardTitle>
              <CardDescription className="text-muted-foreground">Update skills and preferences</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Jobs Created */}
            <Card className="border-border bg-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-foreground">Jobs Created</CardTitle>
                  <Link href="/create-job">
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                      Create new
                      <ChevronRight className="ml-1 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {vacancies.length > 0 && vacancies.map((vacancy: any) => (
                  <div key={vacancy.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">{vacancy.role}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">

                      </div>
                    </div>
              
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Proposals Given */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">Proposals Given</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {proposals.map((proposal: any) => (
                  <div key={proposal.id} className="flex items-start gap-3 p-3 border border-border rounded-lg">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Zap className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-foreground">{proposal.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{new Date(proposal.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Summary */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">Your Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={clerkUser?.imageUrl || "/placeholder.svg"} alt={clerkUser?.fullName || ""} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {clerkUser?.primaryEmailAddress?.toString()
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-foreground">{clerkUser?.fullName}</h3>
                    <p className="text-sm text-muted-foreground">{user?.Department}</p>
                  </div>
                </div>
                <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span className="font-semibold text-foreground">Department:</span>
                    <span>{user?.Department}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-foreground">Section:</span>
                    <span>{user?.Section}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-foreground">Year:</span>
                    <span>{user?.Year}</span>
                  </div>
                </div>
                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground">
                      Edit Profile
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Profile</DialogTitle>
                      <DialogDescription>
                        Update your department, section, and year.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="department" className="text-right">
                          Department
                        </Label>
                        <Input
                          id="department"
                          value={department}
                          onChange={(e) => setDepartment(e.target.value)}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="section" className="text-right">
                          Section
                        </Label>
                        <Input
                          id="section"
                          value={section}
                          onChange={(e) => setSection(e.target.value)}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="year" className="text-right">
                          Year
                        </Label>
                        <Input
                          id="year"
                          value={year}
                          onChange={(e) => setYear(e.target.value)}
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <Button onClick={handleProfileUpdate}>Save</Button>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
