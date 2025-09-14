'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { useRouter } from "next/navigation"
import { useState } from "react"
import type React from "react"
import { CldUploadButton } from "next-cloudinary"

interface FormData {
  name: string
  description: string
}

export default function CreateEventPage() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [imageUrl, setImageUrl] = useState<string>("");
  const [formData, setFormData] = useState<FormData>({
    name: "",
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
      const response = await fetch("/api/events/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          start_date: startDate,
          end_date: endDate,
          image_url: imageUrl,
        }),
      });
      if (response.ok) {
        router.push("/event");
      } else {
        console.error("Failed to create event");
      }
    } catch (error) {
      console.error("Error creating event:", error);
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <div>
      <Card className="w-full max-w-md mx-auto mt-10">
        <CardHeader>
          <CardTitle>Create Event</CardTitle>
          <CardDescription>Create a new event</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="name">Event Name</Label>
              <Input type="text" id="name" name="name" onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="start_date" className="px-1">
                Start Date
              </Label>
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
                className="rounded-lg border"
              />
            </div>
            <div>
              <Label htmlFor="end_date" className="px-1">
                End Date
              </Label>
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                className="rounded-lg border"
              />
            </div>
            <div>
              <Label htmlFor="image">Event Image</Label>
              <CldUploadButton
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                onSuccess={(result: any) => {
                  setImageUrl(result.info.secure_url);
                }}
              />
            </div>
            <Button type="submit" className="cursor-pointer" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Event"}
            </Button>
            <Button type="button" variant="outline" className="cursor-pointer">Cancel</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}