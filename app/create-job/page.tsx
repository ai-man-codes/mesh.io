"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Users, ArrowLeft, Plus, X, Calendar, Target } from "lucide-react"

export default function CreateJobPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    projectType: "",
    category: "",
    teamSize: "",
    duration: "",
    commitment: "",
    location: "",
    experience: "",
    skills: [] as string[],
    roles: [] as string[],
    eventName: "",
    deadline: "",
    contactMethod: "platform",
    additionalInfo: "",
  })

  const [newSkill, setNewSkill] = useState("")
  const [newRole, setNewRole] = useState("")

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }))
      setNewSkill("")
    }
  }

  const removeSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }))
  }

  const addRole = () => {
    if (newRole.trim() && !formData.roles.includes(newRole.trim())) {
      setFormData((prev) => ({
        ...prev,
        roles: [...prev.roles, newRole.trim()],
      }))
      setNewRole("")
    }
  }

  const removeRole = (role: string) => {
    setFormData((prev) => ({
      ...prev,
      roles: prev.roles.filter((r) => r !== role),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement job posting logic
    console.log("Job posting submitted:", formData)
  }

  const suggestedSkills = [
    "React",
    "Python",
    "JavaScript",
    "Node.js",
    "UI/UX Design",
    "Machine Learning",
    "Blockchain",
    "Mobile Development",
    "Data Science",
    "DevOps",
  ]
  const suggestedRoles = [
    "Frontend Developer",
    "Backend Developer",
    "Full-stack Developer",
    "UI/UX Designer",
    "Data Scientist",
    "ML Engineer",
    "Product Manager",
    "Marketing Lead",
  ]

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
              <Link href="/lookout">
                <Button variant="outline" className="bg-transparent border-border">
                  Find Teammates
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">Post an Opportunity</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Create a posting to find talented teammates for your next hackathon or project. Be specific about what
              you're looking for to attract the right collaborators.
            </p>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Basic Information
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Tell us about your project and what you're looking for.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-foreground">
                  Project Title *
                </Label>
                <Input
                  id="title"
                  placeholder="e.g., EcoTrack - Sustainability App for Campus"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="bg-input border-border focus:ring-ring"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-foreground">
                  Project Description *
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe your project idea, goals, and what makes it exciting..."
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  className="bg-input border-border focus:ring-ring min-h-[120px]"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="projectType" className="text-foreground">
                    Project Type *
                  </Label>
                  <Select
                    value={formData.projectType}
                    onValueChange={(value) => handleInputChange("projectType", value)}
                  >
                    <SelectTrigger className="bg-input border-border">
                      <SelectValue placeholder="Select project type" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      <SelectItem value="hackathon" className="text-popover-foreground hover:bg-accent">
                        Hackathon Project
                      </SelectItem>
                      <SelectItem value="startup" className="text-popover-foreground hover:bg-accent">
                        Startup Idea
                      </SelectItem>
                      <SelectItem value="research" className="text-popover-foreground hover:bg-accent">
                        Research Project
                      </SelectItem>
                      <SelectItem value="competition" className="text-popover-foreground hover:bg-accent">
                        Competition Entry
                      </SelectItem>
                      <SelectItem value="personal" className="text-popover-foreground hover:bg-accent">
                        Personal Project
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category" className="text-foreground">
                    Category *
                  </Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger className="bg-input border-border">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      <SelectItem value="ai-ml" className="text-popover-foreground hover:bg-accent">
                        AI/ML
                      </SelectItem>
                      <SelectItem value="web-dev" className="text-popover-foreground hover:bg-accent">
                        Web Development
                      </SelectItem>
                      <SelectItem value="mobile" className="text-popover-foreground hover:bg-accent">
                        Mobile Development
                      </SelectItem>
                      <SelectItem value="fintech" className="text-popover-foreground hover:bg-accent">
                        FinTech
                      </SelectItem>
                      <SelectItem value="healthcare" className="text-popover-foreground hover:bg-accent">
                        Healthcare
                      </SelectItem>
                      <SelectItem value="sustainability" className="text-popover-foreground hover:bg-accent">
                        Sustainability
                      </SelectItem>
                      <SelectItem value="gaming" className="text-popover-foreground hover:bg-accent">
                        Gaming
                      </SelectItem>
                      <SelectItem value="social-impact" className="text-popover-foreground hover:bg-accent">
                        Social Impact
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Team Requirements */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Team Requirements
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Specify what kind of team members you're looking for.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="teamSize" className="text-foreground">
                    Team Size *
                  </Label>
                  <Select value={formData.teamSize} onValueChange={(value) => handleInputChange("teamSize", value)}>
                    <SelectTrigger className="bg-input border-border">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      <SelectItem value="2-3" className="text-popover-foreground hover:bg-accent">
                        2-3 people
                      </SelectItem>
                      <SelectItem value="4-5" className="text-popover-foreground hover:bg-accent">
                        4-5 people
                      </SelectItem>
                      <SelectItem value="6-8" className="text-popover-foreground hover:bg-accent">
                        6-8 people
                      </SelectItem>
                      <SelectItem value="flexible" className="text-popover-foreground hover:bg-accent">
                        Flexible
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience" className="text-foreground">
                    Experience Level
                  </Label>
                  <Select value={formData.experience} onValueChange={(value) => handleInputChange("experience", value)}>
                    <SelectTrigger className="bg-input border-border">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      <SelectItem value="beginner" className="text-popover-foreground hover:bg-accent">
                        Beginner Friendly
                      </SelectItem>
                      <SelectItem value="intermediate" className="text-popover-foreground hover:bg-accent">
                        Intermediate
                      </SelectItem>
                      <SelectItem value="advanced" className="text-popover-foreground hover:bg-accent">
                        Advanced
                      </SelectItem>
                      <SelectItem value="mixed" className="text-popover-foreground hover:bg-accent">
                        Mixed Levels
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="commitment" className="text-foreground">
                    Time Commitment
                  </Label>
                  <Select value={formData.commitment} onValueChange={(value) => handleInputChange("commitment", value)}>
                    <SelectTrigger className="bg-input border-border">
                      <SelectValue placeholder="Select commitment" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      <SelectItem value="weekend" className="text-popover-foreground hover:bg-accent">
                        Weekend Only
                      </SelectItem>
                      <SelectItem value="part-time" className="text-popover-foreground hover:bg-accent">
                        Part-time
                      </SelectItem>
                      <SelectItem value="intensive" className="text-popover-foreground hover:bg-accent">
                        Intensive
                      </SelectItem>
                      <SelectItem value="flexible" className="text-popover-foreground hover:bg-accent">
                        Flexible
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Required Skills */}
              <div className="space-y-3">
                <Label className="text-foreground">Required Skills</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a skill..."
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                    className="bg-input border-border focus:ring-ring"
                  />
                  <Button
                    type="button"
                    onClick={addSkill}
                    size="sm"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="bg-secondary/20 text-secondary-foreground">
                      {skill}
                      <button type="button" onClick={() => removeSkill(skill)} className="ml-1 hover:text-destructive">
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm text-muted-foreground">Suggestions:</span>
                  {suggestedSkills
                    .filter((skill) => !formData.skills.includes(skill))
                    .slice(0, 5)
                    .map((skill) => (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, skills: [...prev.skills, skill] }))}
                        className="text-xs text-primary hover:text-primary/80 underline"
                      >
                        {skill}
                      </button>
                    ))}
                </div>
              </div>

              {/* Specific Roles */}
              <div className="space-y-3">
                <Label className="text-foreground">Specific Roles Needed</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a role..."
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addRole())}
                    className="bg-input border-border focus:ring-ring"
                  />
                  <Button
                    type="button"
                    onClick={addRole}
                    size="sm"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.roles.map((role) => (
                    <Badge key={role} variant="outline" className="border-primary/20 text-primary">
                      {role}
                      <button type="button" onClick={() => removeRole(role)} className="ml-1 hover:text-destructive">
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm text-muted-foreground">Suggestions:</span>
                  {suggestedRoles
                    .filter((role) => !formData.roles.includes(role))
                    .slice(0, 4)
                    .map((role) => (
                      <button
                        key={role}
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, roles: [...prev.roles, role] }))}
                        className="text-xs text-primary hover:text-primary/80 underline"
                      >
                        {role}
                      </button>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Project Details */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Project Details
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Additional information about timeline and logistics.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration" className="text-foreground">
                    Project Duration
                  </Label>
                  <Select value={formData.duration} onValueChange={(value) => handleInputChange("duration", value)}>
                    <SelectTrigger className="bg-input border-border">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      <SelectItem value="1-day" className="text-popover-foreground hover:bg-accent">
                        1 Day
                      </SelectItem>
                      <SelectItem value="weekend" className="text-popover-foreground hover:bg-accent">
                        Weekend (2-3 days)
                      </SelectItem>
                      <SelectItem value="1-week" className="text-popover-foreground hover:bg-accent">
                        1 Week
                      </SelectItem>
                      <SelectItem value="2-4-weeks" className="text-popover-foreground hover:bg-accent">
                        2-4 Weeks
                      </SelectItem>
                      <SelectItem value="1-3-months" className="text-popover-foreground hover:bg-accent">
                        1-3 Months
                      </SelectItem>
                      <SelectItem value="ongoing" className="text-popover-foreground hover:bg-accent">
                        Ongoing
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="text-foreground">
                    Location
                  </Label>
                  <Select value={formData.location} onValueChange={(value) => handleInputChange("location", value)}>
                    <SelectTrigger className="bg-input border-border">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      <SelectItem value="remote" className="text-popover-foreground hover:bg-accent">
                        Remote
                      </SelectItem>
                      <SelectItem value="hybrid" className="text-popover-foreground hover:bg-accent">
                        Hybrid
                      </SelectItem>
                      <SelectItem value="in-person" className="text-popover-foreground hover:bg-accent">
                        In-Person
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="eventName" className="text-foreground">
                    Related Event (Optional)
                  </Label>
                  <Input
                    id="eventName"
                    placeholder="e.g., Stanford Hackathon 2024"
                    value={formData.eventName}
                    onChange={(e) => handleInputChange("eventName", e.target.value)}
                    className="bg-input border-border focus:ring-ring"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deadline" className="text-foreground">
                    Application Deadline
                  </Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => handleInputChange("deadline", e.target.value)}
                    className="bg-input border-border focus:ring-ring"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="additionalInfo" className="text-foreground">
                  Additional Information
                </Label>
                <Textarea
                  id="additionalInfo"
                  placeholder="Any other details, requirements, or expectations..."
                  value={formData.additionalInfo}
                  onChange={(e) => handleInputChange("additionalInfo", e.target.value)}
                  className="bg-input border-border focus:ring-ring"
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact Method */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-foreground">Contact Preferences</CardTitle>
              <CardDescription className="text-muted-foreground">
                How should interested students reach out to you?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={formData.contactMethod}
                onValueChange={(value) => handleInputChange("contactMethod", value)}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="platform" id="platform" className="border-border text-primary" />
                  <Label htmlFor="platform" className="text-foreground">
                    Through Mesh platform (recommended)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="email" id="email" className="border-border text-primary" />
                  <Label htmlFor="email" className="text-foreground">
                    Direct email contact
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="both" id="both" className="border-border text-primary" />
                  <Label htmlFor="both" className="text-foreground">
                    Both platform and email
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex gap-4 pt-4">
            <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
              Post Opportunity
            </Button>
            <Button
              type="button"
              variant="outline"
              className="bg-transparent border-border"
              onClick={() => window.history.back()}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
