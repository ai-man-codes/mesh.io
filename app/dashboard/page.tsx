"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
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

  // Mock user data
  const user = {
    name: "Alex Johnson",
    email: "alex.johnson@stanford.edu",
    university: "Stanford University",
    avatar: "/student-avatar.png",
    skills: ["React", "Python", "UI/UX", "Machine Learning"],
  }

  // Mock data for dashboard
  const upcomingEvents = [
    {
      id: 1,
      name: "Stanford Hackathon 2024",
      date: "March 15-17, 2024",
      location: "Stanford Campus",
      participants: 250,
    },
    {
      id: 2,
      name: "AI/ML Challenge",
      date: "March 22-24, 2024",
      location: "Virtual",
      participants: 180,
    },
  ]

  const recentActivity = [
    {
      id: 1,
      type: "team_invite",
      message: "Sarah Chen invited you to join 'EcoTrack' team",
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "event_registration",
      message: "Successfully registered for Stanford Hackathon 2024",
      time: "1 day ago",
    },
    {
      id: 3,
      type: "profile_view",
      message: "Your profile was viewed by 5 people this week",
      time: "2 days ago",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Link href="/dashboard" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground">Mesh</span>
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/event">
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                  Events
                </Button>
              </Link>
              <Link href="/lookout">
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                  Find Teams
                </Button>
              </Link>
              <Link href="/create-job">
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                  Post Opportunity
                </Button>
              </Link>

              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                {notifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary text-primary-foreground text-xs">
                    {notifications}
                  </Badge>
                )}
              </Button>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-popover border-border" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none text-popover-foreground">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-popover-foreground hover:bg-accent">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-popover-foreground hover:bg-accent">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-popover-foreground hover:bg-accent">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, {user.name.split(" ")[0]}!</h1>
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
            {/* Upcoming Events */}
            <Card className="border-border bg-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-foreground">Upcoming Events</CardTitle>
                  <Link href="/event">
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                      View all
                      <ChevronRight className="ml-1 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">{event.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {event.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {event.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {event.participants} participants
                        </div>
                      </div>
                    </div>
                    <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      Register
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-3 border border-border rounded-lg">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Zap className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-foreground">{activity.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
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
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-foreground">{user.name}</h3>
                    <p className="text-sm text-muted-foreground">{user.university}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground">Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {user.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="bg-secondary/20 text-secondary-foreground">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Button className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground">
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">Your Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Profile views</span>
                  <span className="font-semibold text-foreground">24</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Team invites</span>
                  <span className="font-semibold text-foreground">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Events joined</span>
                  <span className="font-semibold text-foreground">5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Projects completed</span>
                  <span className="font-semibold text-foreground">2</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
