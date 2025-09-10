"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Users,
  Search,
  Filter,
  ArrowLeft,
  MessageCircle,
  UserPlus,
  MapPin,
  GraduationCap,
  Star,
  Clock,
} from "lucide-react"

export default function LookoutPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSkill, setSelectedSkill] = useState("all")
  const [selectedUniversity, setSelectedUniversity] = useState("all")
  const [selectedExperience, setSelectedExperience] = useState("all")

  // Mock student profiles data
  const students = [
    {
      id: 1,
      name: "Sarah Chen",
      university: "Stanford University",
      year: "Junior",
      major: "Computer Science",
      avatar: "/student-1.jpg",
      bio: "Passionate full-stack developer with experience in React and Node.js. Love building user-centric applications.",
      skills: ["React", "Node.js", "Python", "UI/UX Design", "MongoDB"],
      experience: "Intermediate",
      projects: 8,
      hackathons: 5,
      rating: 4.8,
      availability: "Available",
      lookingFor: ["Frontend Developer", "Backend Developer"],
      interests: ["Web Development", "AI/ML", "Sustainability"],
      lastActive: "2 hours ago",
      location: "Palo Alto, CA",
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      university: "MIT",
      year: "Senior",
      major: "Electrical Engineering & CS",
      avatar: "/student-2.jpg",
      bio: "AI/ML enthusiast with strong background in data science and machine learning algorithms.",
      skills: ["Python", "TensorFlow", "PyTorch", "Data Science", "React"],
      experience: "Advanced",
      projects: 12,
      hackathons: 8,
      rating: 4.9,
      availability: "Available",
      lookingFor: ["Data Scientist", "ML Engineer"],
      interests: ["AI/ML", "Data Science", "Healthcare Tech"],
      lastActive: "1 hour ago",
      location: "Cambridge, MA",
    },
    {
      id: 3,
      name: "Emily Zhang",
      university: "UC Berkeley",
      year: "Sophomore",
      major: "Design & Computer Science",
      avatar: "/student-3.jpg",
      bio: "Creative designer and developer passionate about creating beautiful, accessible user experiences.",
      skills: ["Figma", "React", "CSS", "JavaScript", "User Research"],
      experience: "Beginner",
      projects: 4,
      hackathons: 2,
      rating: 4.6,
      availability: "Available",
      lookingFor: ["UI/UX Designer", "Frontend Developer"],
      interests: ["Design", "Accessibility", "Social Impact"],
      lastActive: "30 minutes ago",
      location: "Berkeley, CA",
    },
    {
      id: 4,
      name: "David Kim",
      university: "Stanford University",
      year: "Graduate Student",
      major: "Computer Science (AI Track)",
      avatar: "/student-4.jpg",
      bio: "PhD student researching computer vision and deep learning. Experienced in building scalable ML systems.",
      skills: ["Python", "PyTorch", "Computer Vision", "AWS", "Docker"],
      experience: "Advanced",
      projects: 15,
      hackathons: 10,
      rating: 4.9,
      availability: "Busy",
      lookingFor: ["ML Engineer", "Research Partner"],
      interests: ["Computer Vision", "Deep Learning", "Healthcare"],
      lastActive: "5 hours ago",
      location: "Stanford, CA",
    },
    {
      id: 5,
      name: "Priya Patel",
      university: "Carnegie Mellon",
      year: "Junior",
      major: "Information Systems",
      avatar: "/student-5.jpg",
      bio: "Full-stack developer with a passion for fintech and blockchain technologies. Love solving complex problems.",
      skills: ["JavaScript", "React", "Solidity", "Node.js", "PostgreSQL"],
      experience: "Intermediate",
      projects: 7,
      hackathons: 4,
      rating: 4.7,
      availability: "Available",
      lookingFor: ["Blockchain Developer", "Full-stack Developer"],
      interests: ["FinTech", "Blockchain", "Web3"],
      lastActive: "1 day ago",
      location: "Pittsburgh, PA",
    },
  ]

  const skills = ["all", "React", "Python", "JavaScript", "Node.js", "UI/UX Design", "Machine Learning", "Blockchain"]
  const universities = ["all", "Stanford University", "MIT", "UC Berkeley", "Carnegie Mellon", "Harvard"]
  const experienceLevels = ["all", "Beginner", "Intermediate", "Advanced"]

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesSkill = selectedSkill === "all" || student.skills.includes(selectedSkill)
    const matchesUniversity = selectedUniversity === "all" || student.university === selectedUniversity
    const matchesExperience = selectedExperience === "all" || student.experience === selectedExperience

    return matchesSearch && matchesSkill && matchesUniversity && matchesExperience
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
              <Link href="/create-job">
                <Button variant="outline" className="bg-transparent border-border">
                  Post Opportunity
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
            <h1 className="text-3xl font-bold text-foreground mb-4">Find Your Perfect Teammates</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Connect with talented students who share your passion for building amazing projects and solving complex
              challenges.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 max-w-5xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, skills, or interests..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-input border-border focus:ring-ring"
              />
            </div>
            <Select value={selectedSkill} onValueChange={setSelectedSkill}>
              <SelectTrigger className="w-full md:w-48 bg-input border-border">
                <SelectValue placeholder="Skills" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                {skills.map((skill) => (
                  <SelectItem key={skill} value={skill} className="text-popover-foreground hover:bg-accent">
                    {skill === "all" ? "All Skills" : skill}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedUniversity} onValueChange={setSelectedUniversity}>
              <SelectTrigger className="w-full md:w-48 bg-input border-border">
                <SelectValue placeholder="University" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                {universities.map((university) => (
                  <SelectItem key={university} value={university} className="text-popover-foreground hover:bg-accent">
                    {university === "all" ? "All Universities" : university}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedExperience} onValueChange={setSelectedExperience}>
              <SelectTrigger className="w-full md:w-48 bg-input border-border">
                <SelectValue placeholder="Experience" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                {experienceLevels.map((level) => (
                  <SelectItem key={level} value={level} className="text-popover-foreground hover:bg-accent">
                    {level === "all" ? "All Levels" : level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Students Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-foreground">{filteredStudents.length} Students Found</h2>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Filter className="w-4 h-4" />
            Sorted by activity
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map((student) => (
            <Card key={student.id} className="border-border bg-card hover:shadow-lg transition-all group">
              <CardHeader className="pb-4">
                <div className="flex items-start gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {student.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-foreground truncate">{student.name}</h3>
                      <Badge
                        variant={student.availability === "Available" ? "default" : "secondary"}
                        className={
                          student.availability === "Available"
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-secondary-foreground"
                        }
                      >
                        {student.availability}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                      <GraduationCap className="w-3 h-3" />
                      {student.university}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      {student.location}
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">{student.bio}</p>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Experience</span>
                    <Badge variant="outline" className="border-border text-muted-foreground">
                      {student.experience}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Rating</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-primary text-primary" />
                      <span className="text-foreground font-medium">{student.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Projects</span>
                    <span className="text-foreground font-medium">{student.projects}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground">Top Skills</p>
                  <div className="flex flex-wrap gap-1">
                    {student.skills.slice(0, 4).map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="text-xs bg-secondary/20 text-secondary-foreground"
                      >
                        {skill}
                      </Badge>
                    ))}
                    {student.skills.length > 4 && (
                      <Badge variant="secondary" className="text-xs bg-secondary/20 text-secondary-foreground">
                        +{student.skills.length - 4}
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground">Looking For</p>
                  <div className="flex flex-wrap gap-1">
                    {student.lookingFor.map((role) => (
                      <Badge key={role} variant="outline" className="text-xs border-primary/20 text-primary">
                        {role}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  Active {student.lastActive}
                </div>

                <div className="flex gap-2 pt-2">
                  <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    Connect
                  </Button>
                  <Button size="sm" variant="outline" className="bg-transparent border-border">
                    <UserPlus className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredStudents.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No students found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria to find more potential teammates.
            </p>
            <Button
              onClick={() => {
                setSearchQuery("")
                setSelectedSkill("all")
                setSelectedUniversity("all")
                setSelectedExperience("all")
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
