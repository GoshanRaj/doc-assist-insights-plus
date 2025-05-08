
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

type Appointment = {
  id: string;
  patient: string;
  date: string;
  time: string;
  status: "upcoming" | "completed" | "cancelled";
  reason: string;
};

const initialAppointments: Appointment[] = [
  {
    id: "1",
    patient: "John Smith",
    date: "2025-05-10",
    time: "10:00 AM",
    status: "upcoming",
    reason: "Regular checkup",
  },
  {
    id: "2",
    patient: "Emily Johnson",
    date: "2025-05-10",
    time: "11:00 AM",
    status: "upcoming",
    reason: "Headache and dizziness",
  },
  {
    id: "3",
    patient: "Michael Brown",
    date: "2025-05-10",
    time: "2:00 PM",
    status: "upcoming",
    reason: "Follow-up after surgery",
  },
  {
    id: "4",
    patient: "Sarah Wilson",
    date: "2025-05-09",
    time: "9:00 AM",
    status: "completed",
    reason: "Annual physical",
  },
  {
    id: "5",
    patient: "Robert Martinez",
    date: "2025-05-09",
    time: "3:00 PM",
    status: "completed",
    reason: "Vaccine administration",
  },
  {
    id: "6",
    patient: "Linda Taylor",
    date: "2025-05-08",
    time: "10:00 AM",
    status: "cancelled",
    reason: "Skin rash examination",
  },
];

const DoctorDashboard = () => {
  const [appointments, setAppointments] = 
    useState<Appointment[]>(initialAppointments);
  const [selectedAppointment, setSelectedAppointment] = 
    useState<Appointment | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isNotesDialogOpen, setIsNotesDialogOpen] = useState(false);
  const [notes, setNotes] = useState("");

  const upcomingAppointments = appointments.filter(
    (appointment) => appointment.status === "upcoming"
  );

  const completedAppointments = appointments.filter(
    (appointment) => appointment.status === "completed"
  );

  const cancelledAppointments = appointments.filter(
    (appointment) => appointment.status === "cancelled"
  );

  const handleViewDetails = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsDetailsDialogOpen(true);
  };

  const handleAddNotes = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setNotes("");
    setIsNotesDialogOpen(true);
  };

  const handleMarkCompleted = (id: string) => {
    setAppointments(
      appointments.map((appointment) =>
        appointment.id === id
          ? { ...appointment, status: "completed" }
          : appointment
      )
    );
    toast.success("Appointment marked as completed");
  };

  const handleSaveNotes = () => {
    toast.success("Patient notes saved successfully");
    setIsNotesDialogOpen(false);
  };

  return (
    <>
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Doctor Dashboard</CardTitle>
            <CardDescription>
              Manage your appointments and patient records
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl">{upcomingAppointments.length}</CardTitle>
                  <CardDescription>Upcoming Appointments</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-xs text-muted-foreground">
                    Today, {new Date().toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl">{completedAppointments.length}</CardTitle>
                  <CardDescription>Completed Appointments</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-xs text-muted-foreground">
                    Last 7 days
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl">8</CardTitle>
                  <CardDescription>New Patient Records</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-xs text-muted-foreground">
                    Last 30 days
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="upcoming">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
              </TabsList>
              
              <TabsContent value="upcoming">
                {upcomingAppointments.length > 0 ? (
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Patient</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Time</TableHead>
                          <TableHead>Reason</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {upcomingAppointments.map((appointment) => (
                          <TableRow key={appointment.id}>
                            <TableCell>{appointment.patient}</TableCell>
                            <TableCell>
                              {new Date(appointment.date).toLocaleDateString()}
                            </TableCell>
                            <TableCell>{appointment.time}</TableCell>
                            <TableCell>{appointment.reason}</TableCell>
                            <TableCell className="text-right space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleViewDetails(appointment)}
                              >
                                Details
                              </Button>
                              <Button
                                variant="default"
                                size="sm"
                                onClick={() => handleMarkCompleted(appointment.id)}
                              >
                                Complete
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <p className="text-muted-foreground">
                      No upcoming appointments
                    </p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="completed">
                {completedAppointments.length > 0 ? (
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Patient</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Time</TableHead>
                          <TableHead>Reason</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {completedAppointments.map((appointment) => (
                          <TableRow key={appointment.id}>
                            <TableCell>{appointment.patient}</TableCell>
                            <TableCell>
                              {new Date(appointment.date).toLocaleDateString()}
                            </TableCell>
                            <TableCell>{appointment.time}</TableCell>
                            <TableCell>{appointment.reason}</TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleAddNotes(appointment)}
                              >
                                Add Notes
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <p className="text-muted-foreground">
                      No completed appointments
                    </p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="cancelled">
                {cancelledAppointments.length > 0 ? (
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Patient</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Time</TableHead>
                          <TableHead>Reason</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {cancelledAppointments.map((appointment) => (
                          <TableRow key={appointment.id}>
                            <TableCell>{appointment.patient}</TableCell>
                            <TableCell>
                              {new Date(appointment.date).toLocaleDateString()}
                            </TableCell>
                            <TableCell>{appointment.time}</TableCell>
                            <TableCell>{appointment.reason}</TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleViewDetails(appointment)}
                              >
                                Details
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <p className="text-muted-foreground">
                      No cancelled appointments
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Appointment Details</DialogTitle>
            <DialogDescription>
              {selectedAppointment?.patient} • {selectedAppointment && new Date(selectedAppointment.date).toLocaleDateString()} • {selectedAppointment?.time}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Status</Label>
              <div className="col-span-3">
                <span className={cn(
                  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                  selectedAppointment?.status === "upcoming" && "bg-medical-light text-medical-dark",
                  selectedAppointment?.status === "completed" && "bg-success-light text-success-dark",
                  selectedAppointment?.status === "cancelled" && "bg-warning-light text-warning-dark"
                )}>
                  {selectedAppointment?.status.charAt(0).toUpperCase() + selectedAppointment?.status.slice(1)}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Reason</Label>
              <div className="col-span-3">
                {selectedAppointment?.reason}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Patient ID</Label>
              <div className="col-span-3">
                #{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Contact</Label>
              <div className="col-span-3">
                +1 (555) 123-4567
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsDetailsDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Notes Dialog */}
      <Dialog open={isNotesDialogOpen} onOpenChange={setIsNotesDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Patient Notes</DialogTitle>
            <DialogDescription>
              Add notes for {selectedAppointment?.patient}'s appointment
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="notes" className="text-right">
                Notes
              </Label>
              <textarea
                id="notes"
                className="col-span-3 min-h-[200px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="Enter detailed notes about the patient's visit"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNotesDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveNotes}>Save Notes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DoctorDashboard;
