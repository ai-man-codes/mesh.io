"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Calendar, MapPin, Clock, ArrowLeft, Trophy, Bell } from "lucide-react"

export default function UpcomingEventsPage() {
  // Mock upcoming events data (only future events)
  const upcomingEvents = [
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
      daysUntil: 12,
      registrationDeadline: "March 10, 2024",
      tags: ["Web Dev", "Mobile", "AI/ML", "Sustainability"],
      isRegistered: true,
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
      daysUntil: 19,
      registrationDeadline: "March 18, 2024",
      tags: ["Python", "TensorFlow", "PyTorch", "Data Science"],
      isRegistered: false,
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
      daysUntil: 33,
      registrationDeadline: "March 30, 2024",
      tags: ["Blockchain", "React", "Node.js", "Security"],
      isRegistered: false,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link href="/event" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="w-4 h-4" />
                All Events
              </Link>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground">Mesh</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/event">
                <Button variant="outline" className="bg-transparent border-border">
                  Browse All Events
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
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">Upcoming Events</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Stay on top of your registered events and discover new opportunities coming soon.
            </p>
          </div>
        </div>
      </div>

      {/* Events Timeline */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {upcomingEvents.map((event, index) => (
            <Card key={event.id} className="border-border bg-card hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  {/* Timeline indicator */}
                  <div className="flex items-center gap-4 lg:flex-col lg:items-center lg:gap-2">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-semibold text-primary">{event.daysUntil} days</div>
                      <div className="text-xs text-muted-foreground">until event</div>
                    </div>
                  </div>

                  {/* Event details */}
                  <div className="flex-1 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-semibold text-foreground">{event.name}</h3>
                          {event.isRegistered && (
                            <Badge className="bg-primary text-primary-foreground">
                              <Bell className="w-3 h-3 mr-1" />
                              Registered
                            </Badge>
                          )}
                        </div>
                        <p className="text-muted-foreground mb-3">{event.description}</p>
                      </div>
                      <Badge variant="outline" className="border-border text-muted-foreground self-start">
                        {event.category}
                      </Badge>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
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
                        {event.participants}/{event.maxParticipants}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Trophy className="w-4 h-4" />
                        {event.prize}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {event.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs bg-secondary/20 text-secondary-foreground"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      {event.isRegistered ? (
                        <>
                          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                            View Event Details
                          </Button>
                          <Button variant="outline" className="bg-transparent border-border">
                            Find Teammates
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                            Register Now
                          </Button>
                          <Button variant="outline" className="bg-transparent border-border">
                            Learn More
                          </Button>
                        </>
                      )}
                    </div>

                    {!event.isRegistered && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg">
                        <Clock className="w-4 h-4" />
                        Registration deadline: {event.registrationDeadline}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {upcomingEvents.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No upcoming events</h3>
            <p className="text-muted-foreground mb-4">
              You haven't registered for any upcoming events yet. Discover amazing hackathons and competitions to join.
            </p>
            <Link href="/event">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Browse Events</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
