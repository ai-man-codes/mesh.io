"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, Calendar, MapPin, Clock, Search, Filter, ArrowLeft, ExternalLink, Trophy } from "lucide-react"

export default function EventPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")

  // Mock events data
  const events = [
    {
      id: 1,
      name: "Stanford Hackathon 2024",
      description: "Build innovative solutions for sustainability and climate change",
      date: "March 15-17, 2024",
      location: "Stanford Campus, CA",
      type: "In-Person",
      category: "Sustainability",
      participants: 250,
      maxParticipants: 300,
      prize: "$50,000",
      difficulty: "Beginner Friendly",
      tags: ["Web Dev", "Mobile", "AI/ML", "Sustainability"],
      organizer: "Stanford CS Department",
      registrationDeadline: "March 10, 2024",
      status: "Open",
    },
    {
      id: 2,
      name: "AI/ML Challenge 2024",
      description: "Compete in machine learning challenges and build intelligent applications",
      date: "March 22-24, 2024",
      location: "Virtual Event",
      type: "Virtual",
      category: "AI/ML",
      participants: 180,
      maxParticipants: 200,
      prize: "$25,000",
      difficulty: "Intermediate",
      tags: ["Python", "TensorFlow", "PyTorch", "Data Science"],
      organizer: "Tech Innovation Hub",
      registrationDeadline: "March 18, 2024",
      status: "Open",
    },
    {
      id: 3,
      name: "FinTech Innovation Hackathon",
      description: "Revolutionize financial services with cutting-edge technology",
      date: "April 5-7, 2024",
      location: "San Francisco, CA",
      type: "In-Person",
      category: "FinTech",
      participants: 320,
      maxParticipants: 400,
      prize: "$75,000",
      difficulty: "Advanced",
      tags: ["Blockchain", "React", "Node.js", "Security"],
      organizer: "FinTech Alliance",
      registrationDeadline: "March 30, 2024",
      status: "Open",
    },
    {
      id: 4,
      name: "Healthcare Innovation Challenge",
      description: "Create solutions to improve healthcare accessibility and outcomes",
      date: "February 28 - March 2, 2024",
      location: "Boston, MA",
      type: "In-Person",
      category: "Healthcare",
      participants: 150,
      maxParticipants: 150,
      prize: "$40,000",
      difficulty: "Beginner Friendly",
      tags: ["Mobile Health", "IoT", "Data Analytics"],
      organizer: "MedTech Innovators",
      registrationDeadline: "February 25, 2024",
      status: "Closed",
    },
  ]

  const categories = ["all", "AI/ML", "Sustainability", "FinTech", "Healthcare", "Gaming", "Social Impact"]
  const locations = ["all", "Virtual", "California", "New York", "Massachusetts", "Texas"]

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || event.category === selectedCategory
    const matchesLocation =
      selectedLocation === "all" ||
      (selectedLocation === "Virtual" && event.type === "Virtual") ||
      event.location.includes(selectedLocation)

    return matchesSearch && matchesCategory && matchesLocation
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="w-4 h-4" />
                Dashboard
              </Link>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground">Mesh</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/upcoming">
                <Button variant="outline" className="bg-transparent border-border">
                  Upcoming Events
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Dashboard</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Header Section */}
      <div className="bg-card/30 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-4">Discover Amazing Events</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Find hackathons, competitions, and collaborative events to showcase your skills and build incredible
              projects.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-input border-border focus:ring-ring"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48 bg-input border-border">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                {categories.map((category) => (
                  <SelectItem key={category} value={category} className="text-popover-foreground hover:bg-accent">
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="w-full md:w-48 bg-input border-border">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                {locations.map((location) => (
                  <SelectItem key={location} value={location} className="text-popover-foreground hover:bg-accent">
                    {location === "all" ? "All Locations" : location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-foreground">{filteredEvents.length} Events Found</h2>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Filter className="w-4 h-4" />
            Sorted by date
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <Card key={event.id} className="border-border bg-card hover:shadow-lg transition-all group">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Badge
                    variant={event.status === "Open" ? "default" : "secondary"}
                    className={
                      event.status === "Open"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }
                  >
                    {event.status}
                  </Badge>
                  <Badge variant="outline" className="border-border text-muted-foreground">
                    {event.type}
                  </Badge>
                </div>
                <CardTitle className="text-foreground group-hover:text-primary transition-colors">
                  {event.name}
                </CardTitle>
                <CardDescription className="text-muted-foreground line-clamp-2">{event.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {event.date}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    {event.location}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="w-4 h-4" />
                    {event.participants}/{event.maxParticipants} participants
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Trophy className="w-4 h-4" />
                    {event.prize} prize pool
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    Register by {event.registrationDeadline}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {event.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs bg-secondary/20 text-secondary-foreground">
                      {tag}
                    </Badge>
                  ))}
                  {event.tags.length > 3 && (
                    <Badge variant="secondary" className="text-xs bg-secondary/20 text-secondary-foreground">
                      +{event.tags.length - 3}
                    </Badge>
                  )}
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                    disabled={event.status === "Closed"}
                  >
                    {event.status === "Closed" ? "Registration Closed" : "Register Now"}
                  </Button>
                  <Button size="sm" variant="outline" className="bg-transparent border-border">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No events found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or check back later for new events.
            </p>
            <Button
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("all")
                setSelectedLocation("all")
              }}
              variant="outline"
              className="bg-transparent border-border"
            >
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
