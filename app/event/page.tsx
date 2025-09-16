import { prisma } from "@/lib/db";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin } from "lucide-react";

export default async function EventPage() {
  const events = await prisma.event.findMany();

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Events</h1>
        <Button asChild>
          <Link href="/create-event">
            <div className="rounded-full bg-primary text-primary-foreground">
              Create Event
            </div></Link>
        </Button>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <Card key={event.id} className="hover:shadow-lg duration-300 rounded-2xl hover:border-primary transition-all">
            <img src={event.image_url} alt={event.name} className="rounded-t-lg w-full h-3/5 object-cover" />
            <CardHeader>
              <CardTitle className="text-xl font-bold">{event.name}</CardTitle>
              <CardDescription className="line-clamp-2">{event.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 text-sm">
              <div className="flex items-center gap-4 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>{new Date(event.start_date).toLocaleDateString()} - {new Date(event.end_date).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}