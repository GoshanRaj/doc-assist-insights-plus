
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type Doctor = {
  id: string;
  name: string;
  specialty: string;
  image: string;
};

const doctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    specialty: "Dermatologist",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: "3",
    name: "Dr. Emily Rodriguez",
    specialty: "Pediatrician",
    image: "https://randomuser.me/api/portraits/women/66.jpg",
  },
  {
    id: "4",
    name: "Dr. James Wilson",
    specialty: "Orthopedic Surgeon",
    image: "https://randomuser.me/api/portraits/men/86.jpg",
  },
];

const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
];

const AppointmentForm = () => {
  const [selectedDoctor, setSelectedDoctor] = useState<string | undefined>();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | undefined>();
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDoctor || !selectedDate || !selectedTime) {
      toast.error("Please fill all required fields");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const doctor = doctors.find((d) => d.id === selectedDoctor);
      
      toast.success("Appointment booked successfully!", {
        description: `Your appointment with ${doctor?.name} is scheduled for ${format(selectedDate, "MMMM d, yyyy")} at ${selectedTime}.`,
      });
      
      // Reset form
      setSelectedDoctor(undefined);
      setSelectedTime(undefined);
      setReason("");
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Book Appointment</CardTitle>
        <CardDescription>
          Schedule an appointment with one of our specialists
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Select Doctor</label>
            <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
              <SelectTrigger>
                <SelectValue placeholder="Select a doctor" />
              </SelectTrigger>
              <SelectContent>
                {doctors.map((doctor) => (
                  <SelectItem key={doctor.id} value={doctor.id}>
                    <div className="flex items-center">
                      <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="h-6 w-6 rounded-full mr-2"
                      />
                      <div>
                        <span>{doctor.name}</span>
                        <span className="text-muted-foreground text-xs ml-2">
                          ({doctor.specialty})
                        </span>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Select Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? (
                    format(selectedDate, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  initialFocus
                  disabled={(date) =>
                    date < new Date() || date > new Date(new Date().setDate(new Date().getDate() + 30))
                  }
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Select Time</label>
            <Select value={selectedTime} onValueChange={setSelectedTime}>
              <SelectTrigger>
                <SelectValue placeholder="Select a time slot" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((time) => (
                  <SelectItem key={time} value={time}>
                    <div className="flex items-center">
                      <Clock className="h-3.5 w-3.5 mr-2" />
                      {time}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Reason for Visit</label>
            <textarea
              className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
              placeholder="Briefly describe your symptoms or reason for the appointment"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Booking..." : "Book Appointment"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default AppointmentForm;
