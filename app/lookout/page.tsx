//@ts-nocheck
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import {
  Users,
  Search,
  Filter,
  ArrowLeft,
  MessageCircle,
  UserPlus,
  Mail,
  Briefcase,
  Calendar,
  Clock,
} from "lucide-react"


// Define interfaces based on your Prisma schema
interface User {
  id: string;
  name: string | null;
  email: string;
  createdAt: string;
  updatedAt: string;
}

interface Vacancy {
  id: string;
  role: string;
  description: string | null;
  isOpen: boolean;
  createdAt: string;
  vacantTill: string;
  teamId: string;
  _count?: {
    proposals: number;
  };
}

interface ApplicationData {
  vacancyId: string;
  userId: string;
  message: string;
}

export default function LookoutPage() {
  const [users, setUsers] = useState<User[]>([])
  const [vacancies, setVacancies] = useState<Vacancy[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'users' | 'jobs'>('jobs')
  const { user } = useUser();
  const [userDb,setUserDb]=useState()
  // Dialog state
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedVacancy, setSelectedVacancy] = useState<Vacancy | null>(null)
  const [applicationMessage, setApplicationMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // http://localhost:3000/api/user
       const userResponse=await fetch("/api/user",{
        method:"GET",
        headers:{
          "Content-Type":"application/json"
        }
       })
       console.log("The user response is ",userResponse)

       if(userResponse.ok){
        const userData=await userResponse.json();
        console.log("The user data from the db is ",userData)
        setUserDb(userData.data)
       }

        // Fetch vacancies
        const vacanciesResponse = await fetch("/api/vacancies")
        if (vacanciesResponse.ok) {
          const vacanciesData = await vacanciesResponse.json()
          setVacancies(vacanciesData)
        }
      } catch (error) {
        console.error("Failed to fetch data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredUsers = users.filter((user) => {
    const searchLower = searchQuery.toLowerCase()
    const nameMatch = user.name?.toLowerCase().includes(searchLower)
    const emailMatch = user.email.toLowerCase().includes(searchLower)
    
    return nameMatch || emailMatch
  }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  const filteredVacancies = vacancies.filter((vacancy) => {
    const searchLower = searchQuery.toLowerCase()
    const roleMatch = vacancy.role.toLowerCase().includes(searchLower)
    const descriptionMatch = vacancy.description?.toLowerCase().includes(searchLower)
    
    return (roleMatch || descriptionMatch) && vacancy.isOpen
  }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  const handleApplyClick = (vacancy: Vacancy) => {
    setSelectedVacancy(vacancy)
    setApplicationMessage("")
    setIsDialogOpen(true)
  }

  const handleSubmitApplication = async () => {
    console.log("The selected vacancy and application message are :",selectedVacancy,applicationMessage)
    if (!selectedVacancy || !applicationMessage.trim() || !user) {
      toast({
        title: "Error",
        description: "Please provide a message for your application and make sure you are logged in.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      console.log("The user db is ",userDb)
      if(!userDb){
        throw new Error("User data not loaded")
      }
      if(!userDb.id){
        throw new Error("User ID not found")
      }
      const applicationData: ApplicationData = {
        vacancyId: selectedVacancy.id,
        userId: userDb.id,
        message: applicationMessage.trim(),
      }

      const response = await fetch("/api/proposals/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(applicationData),
      })
      console.log("The response from the application submission is :",response)
      if (!response.ok) {
        throw new Error("Failed to submit application")
      }

      toast({
        title: "Success!",
        description: "Your application has been submitted successfully.",
      })

      setVacancies(prevVacancies => prevVacancies.map(v => {
        if (v.id === selectedVacancy.id) {
          return {
            ...v,
            _count: {
              proposals: (v._count?.proposals || 0) + 1
            }
          }
        }
        return v;
      }))

      setIsDialogOpen(false)
      setSelectedVacancy(null)
      setApplicationMessage("")
    } catch (error) {
      console.error("Application submission error:", error)
      toast({
        title: "Error",
        description: "Failed to submit your application. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const isVacancyExpired = (vacantTill: string) => {
    return new Date(vacantTill) < new Date()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
     

      {/* Header Section */}
      <div className="bg-card/30 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-4">
              {activeTab === 'users' ? 'Find Your Perfect Teammates' : 'Discover Opportunities'}
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {activeTab === 'users' 
                ? 'Connect with talented users who share your passion for building amazing projects.'
                : 'Find exciting job opportunities and apply to join amazing teams.'
              }
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-6">
            <div className="bg-muted rounded-full p-1 inline-flex">
              <div
                onClick={() => setActiveTab('jobs')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === 'jobs'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Briefcase className="w-4 h-4 mr-2 inline" />
                Jobs
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-foreground">
            {activeTab === 'users' 
              ? `${filteredUsers.length} Users Found`
              : `${filteredVacancies.length} Job Opportunities`
            }
          </h2>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Filter className="w-4 h-4" />
            Sorted by creation date
          </div>
        </div>

        {/* Users Grid */}
        {activeTab === 'users' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((user) => (
              <Card key={user.id} className="border-border bg-card hover:shadow-lg transition-all group rounded-2xl">
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-16 w-16 rounded-full">
                      <AvatarImage src={`/placeholder-user.jpg`} alt={user.name || "User"} />
                      <AvatarFallback className="bg-primary text-primary-foreground rounded-full">
                        {user.name
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("") || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg text-foreground truncate">{user.name || "Anonymous User"}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <Mail className="w-4 h-4" />
                        {user.email}
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Connect
                    </Button>
                    <Button size="sm" variant="outline" className="bg-transparent border-border rounded-full">
                      <UserPlus className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Jobs Grid */}
        {activeTab === 'jobs' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVacancies.map((vacancy) => (
              <Card key={vacancy.id} className="border-border bg-card hover:shadow-lg transition-all group rounded-2xl">
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <Briefcase className="w-8 h-8 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg text-foreground truncate">{vacancy.role}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <Calendar className="w-4 h-4" />
                        Posted {formatDate(vacancy.createdAt)}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <Clock className="w-4 h-4" />
                        <span className={isVacancyExpired(vacancy.vacantTill) ? "text-red-500" : ""}>
                          {isVacancyExpired(vacancy.vacantTill) ? "Expired" : `Apply by ${formatDate(vacancy.vacantTill)}`}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {vacancy.description && (
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {vacancy.description}
                    </p>
                  )}
                  
                  {vacancy._count?.proposals && (
                    <div className="text-xs text-muted-foreground">
                      {vacancy._count.proposals} applications
                    </div>
                  )}

                  <div className="flex gap-2 pt-2">
                    <Button 
                      size="sm" 
                      className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full"
                      onClick={() => handleApplyClick(vacancy)}
                      disabled={!vacancy.isOpen || isVacancyExpired(vacancy.vacantTill)}
                    >
                      <Briefcase className="w-4 h-4 mr-2" />
                      {isVacancyExpired(vacancy.vacantTill) ? "Expired" : "Apply Now"}
                    </Button>
                    <Button size="sm" variant="outline" className="bg-transparent border-border rounded-full">
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* No Results */}
        {((activeTab === 'users' && filteredUsers.length === 0) || 
          (activeTab === 'jobs' && filteredVacancies.length === 0)) && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              {activeTab === 'users' ? (
                <Users className="w-10 h-10 text-muted-foreground" />
              ) : (
                <Briefcase className="w-10 h-10 text-muted-foreground" />
              )}
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No {activeTab === 'users' ? 'users' : 'job opportunities'} found
            </h3>
          </div>
        )}
      </div>

      {/* Application Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Apply for {selectedVacancy?.role}</DialogTitle>
            <DialogDescription>
              Tell the hiring team why you're a great fit for this role. Your application will be reviewed by the team.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="message">Application Message</Label>
              <Textarea
                id="message"
                placeholder="Tell us about your experience, skills, and why you're interested in this role..."
                value={applicationMessage}
                onChange={(e) => setApplicationMessage(e.target.value)}
                className="min-h-[120px] resize-none"
                maxLength={1000}
              />
              <div className="text-xs text-muted-foreground text-right">
                {applicationMessage.length}/1000 characters
              </div>
            </div>
          </div>

          <DialogFooter className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => setIsDialogOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSubmitApplication}
              disabled={isSubmitting || !applicationMessage.trim()}
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}