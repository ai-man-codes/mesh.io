"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { useRouter } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import { useState } from "react"
import type React from "react"

interface FormData {
  role: string
  description: string
}

export default function CreateJobPage() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [date, setDate] = useState<Date>()
  const user=useUser()

  const [formData, setFormData] = useState<FormData>({
    role: "",
    description: "",
  });
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const usergetResponse=(await(await fetch("/api/user",{
        method:"GET",
        headers:{
          "Content-Type":"application/json"
        }
      })).json()).data.id
      const response = await fetch("/api/vacancies/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role: formData.role,
          description: formData.description,
          vacantTill: date,
          vacancies_url: user.user?.imageUrl,
          createdBy:usergetResponse
        }),
      });
      if (response.ok) {
        router.push("/dashboard");
      } else {
        console.error("Failed to create job");
      }
    } catch (error) {
      console.error("Error creating job:", error);
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <div>
      <Card className="w-full max-w-md mx-auto mt-10">
        <CardHeader>
          <CardTitle>Create Job</CardTitle>
          <CardDescription>Create a new job listing</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="role">Role</Label>
              <Input type="text" id="role" name="role" onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="openTillDate" className="px-1">
                Open Till Date
              </Label>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-lg border"
              />
            </div>
            <Button type="submit" className="cursor-pointer" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Job"}
            </Button>
            <Button type="button" variant="outline" className="cursor-pointer">Cancel</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}