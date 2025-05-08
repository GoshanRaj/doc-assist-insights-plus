
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import AppointmentForm from "./AppointmentForm";
import HealthRecords from "./HealthRecords";
import HealthChatbot from "./HealthChatbot";
import { Calendar, MessageCircle, Clock } from "lucide-react";

type Appointment = {
  id: string;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  status: "upcoming" | "completed" | "cancelled";
};

const initialAppointments: Appointment[] = [
  {
    id: "1",
    doctor: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    date: "2025-05-12",
    time: "10:30 AM",
    status: "upcoming",
  },
  {
    id: "2",
    doctor: "Dr. Michael Chen",
    specialty: "Dermatologist",
    date: "2025-05-15",
    time: "2:00 PM",
    status: "upcoming",
  },
  {
    id: "3",
    doctor: "Dr. Emily Rodriguez",
    specialty: "Pediatrician",
    date: "2025-05-05",
    time: "9:00 AM",
    status: "completed",
  },
];

const PatientDashboard = () => {
  const [appointments] = useState<Appointment[]>(initialAppointments);

  const upcomingAppointments = appointments.filter(
    (appointment) => appointment.status === "upcoming"
  );

  const completedAppointments = appointments.filter(
    (appointment) => appointment.status === "completed"
  );

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-medical" />
              <CardTitle className="text-lg">Upcoming Appointments</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{upcomingAppointments.length}</div>
            <p className="text-xs text-muted-foreground">
              Next: {upcomingAppointments.length > 0 ? new Date(upcomingAppointments[0].date).toLocaleDateString() : "None scheduled"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-medical" />
              <CardTitle className="text-lg">Past Visits</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{completedAppointments.length}</div>
            <p className="text-xs text-muted-foreground">
              Last visit: {completedAppointments.length > 0 ? new Date(completedAppointments[0].date).toLocaleDateString() : "None recorded"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center space-x-2">
              <MessageCircle className="h-4 w-4 text-medical" />
              <CardTitle className="text-lg">Health Chat</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">24/7</div>
            <p className="text-xs text-muted-foreground">
              AI health tips available anytime
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="appointments">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="records">Health Records</TabsTrigger>
          <TabsTrigger value="chat">Health Assistant</TabsTrigger>
        </TabsList>
        <TabsContent value="appointments">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Your Appointments</CardTitle>
                <CardDescription>
                  View your upcoming and past appointments
                </CardDescription>
              </CardHeader>
              <CardContent>
                {upcomingAppointments.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingAppointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div>
                          <h4 className="font-medium">{appointment.doctor}</h4>
                          <p className="text-sm text-muted-foreground">
                            {appointment.specialty}
                          </p>
                          <div className="flex items-center mt-2 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3 mr-1" />
                            {new Date(appointment.date).toLocaleDateString()}
                            <Clock className="h-3 w-3 mx-1 ml-3" />
                            {appointment.time}
                          </div>
                        </div>
                        <div className="bg-medical-light text-medical-dark text-xs font-medium px-2 py-1 rounded-full">
                          Upcoming
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground">
                      No upcoming appointments
                    </p>
                  </div>
                )}
                
                <div className="mt-6 pt-6 border-t">
                  <h3 className="text-sm font-medium mb-4">Past Appointments</h3>
                  {completedAppointments.length > 0 ? (
                    <div className="space-y-4">
                      {completedAppointments.map((appointment) => (
                        <div
                          key={appointment.id}
                          className="flex items-center justify-between p-4 border rounded-lg"
                        >
                          <div>
                            <h4 className="font-medium">{appointment.doctor}</h4>
                            <p className="text-sm text-muted-foreground">
                              {appointment.specialty}
                            </p>
                            <div className="flex items-center mt-2 text-xs text-muted-foreground">
                              <Calendar className="h-3 w-3 mr-1" />
                              {new Date(appointment.date).toLocaleDateString()}
                              <Clock className="h-3 w-3 mx-1 ml-3" />
                              {appointment.time}
                            </div>
                          </div>
                          <div className="bg-success-light text-success-dark text-xs font-medium px-2 py-1 rounded-full">
                            Completed
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-muted-foreground">
                        No past appointments
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            <AppointmentForm />
          </div>
        </TabsContent>
        <TabsContent value="records">
          <HealthRecords />
        </TabsContent>
        <TabsContent value="chat">
          <div className="max-w-2xl mx-auto">
            <HealthChatbot />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PatientDashboard;
