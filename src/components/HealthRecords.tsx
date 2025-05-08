
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

type HealthRecord = {
  id: string;
  date: string;
  type: string;
  doctor: string;
  notes: string;
};

const initialRecords: HealthRecord[] = [
  {
    id: "1",
    date: "2025-04-15",
    type: "General Checkup",
    doctor: "Dr. Sarah Johnson",
    notes: "Blood pressure: 120/80, Weight: 68kg, Overall health is good. Advised to improve diet and exercise more regularly.",
  },
  {
    id: "2",
    date: "2025-03-10",
    type: "Blood Test",
    doctor: "Dr. Michael Chen",
    notes: "All levels normal. Vitamin D slightly low, supplement recommended.",
  },
  {
    id: "3",
    date: "2025-02-22",
    type: "Dental Checkup",
    doctor: "Dr. Emily Rodriguez",
    notes: "No cavities. Regular brushing and flossing recommended. Next checkup in 6 months.",
  },
];

const HealthRecords = () => {
  const [records, setRecords] = useState<HealthRecord[]>(initialRecords);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<HealthRecord | null>(null);
  const [newRecord, setNewRecord] = useState({
    date: new Date().toISOString().split('T')[0],
    type: "",
    doctor: "",
    notes: "",
  });

  const handleAddRecord = () => {
    const record = {
      id: Date.now().toString(),
      ...newRecord,
    };
    
    setRecords([record, ...records]);
    setIsAddDialogOpen(false);
    setNewRecord({
      date: new Date().toISOString().split('T')[0],
      type: "",
      doctor: "",
      notes: "",
    });
    
    toast.success("Health record added successfully!");
  };

  const handleViewRecord = (record: HealthRecord) => {
    setSelectedRecord(record);
    setIsViewDialogOpen(true);
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Health Records</CardTitle>
            <CardDescription>
              Your medical history and health information
            </CardDescription>
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)}>Add Record</Button>
        </CardHeader>
        <CardContent>
          {records.length > 0 ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {records.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                      <TableCell>{record.type}</TableCell>
                      <TableCell>{record.doctor}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewRecord(record)}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="mb-4 rounded-full bg-medical-light p-3">
                <svg className="h-6 w-6 text-medical-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-sm text-muted-foreground">
                No health records found. Add your first record.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Record Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Health Record</DialogTitle>
            <DialogDescription>
              Add details about your medical appointment or test
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Date
              </Label>
              <Input
                id="date"
                type="date"
                className="col-span-3"
                value={newRecord.date}
                onChange={(e) => setNewRecord({ ...newRecord, date: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Type
              </Label>
              <Input
                id="type"
                className="col-span-3"
                placeholder="e.g., General Checkup, Blood Test"
                value={newRecord.type}
                onChange={(e) => setNewRecord({ ...newRecord, type: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="doctor" className="text-right">
                Doctor
              </Label>
              <Input
                id="doctor"
                className="col-span-3"
                placeholder="Doctor's name"
                value={newRecord.doctor}
                onChange={(e) => setNewRecord({ ...newRecord, doctor: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="notes" className="text-right">
                Notes
              </Label>
              <textarea
                id="notes"
                className="col-span-3 min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="Detailed notes about the visit"
                value={newRecord.notes}
                onChange={(e) => setNewRecord({ ...newRecord, notes: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddRecord}>Save Record</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Record Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedRecord?.type}</DialogTitle>
            <DialogDescription>
              {selectedRecord && new Date(selectedRecord.date).toLocaleDateString()} • {selectedRecord?.doctor}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <h4 className="text-sm font-medium mb-2">Notes:</h4>
            <p className="text-sm text-muted-foreground whitespace-pre-line">
              {selectedRecord?.notes}
            </p>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsViewDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default HealthRecords;
