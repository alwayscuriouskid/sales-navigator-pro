import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lead } from "@/types/leads";
import LeadFormRequirements from "./LeadFormRequirements";
import LeadFormStatus from "./LeadFormStatus";

interface LeadFormProps {
  onSubmit: (lead: Partial<Lead>) => void;
  onCancel: () => void;
  initialData?: Partial<Lead>;
  mode?: "add" | "edit";
  customStatuses: string[];
}

const LeadForm = ({ onSubmit, onCancel, initialData, mode = "add", customStatuses }: LeadFormProps) => {
  const [formData, setFormData] = useState<Partial<Lead>>(
    initialData || {
      clientName: "",
      location: "",
      contactPerson: "",
      phone: "",
      email: "",
      requirement: {},
      status: "pending",
      remarks: "",
      budget: "",
      followUps: [],
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      date: formData.date || new Date().toISOString().split("T")[0],
    });
  };

  const handleInputChange = (field: keyof Lead, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleRequirementChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      requirement: {
        ...prev.requirement,
        [field]: field === "customRequirements" ? value : (parseInt(value) || 0),
      },
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{mode === "add" ? "Add New Lead" : "Edit Lead"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="clientName">Client Name</Label>
              <Input
                id="clientName"
                value={formData.clientName}
                onChange={(e) => handleInputChange("clientName", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactPerson">Contact Person</Label>
              <Input
                id="contactPerson"
                value={formData.contactPerson}
                onChange={(e) => handleInputChange("contactPerson", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="budget">Budget</Label>
              <Input
                id="budget"
                value={formData.budget}
                onChange={(e) => handleInputChange("budget", e.target.value)}
              />
            </div>
          </div>

          <LeadFormStatus
            status={formData.status || "pending"}
            onStatusChange={(value) => handleInputChange("status", value)}
            customStatuses={customStatuses}
            onAddCustomStatus={(status) => {
              console.log("Adding new status:", status);
              handleInputChange("status", status);
            }}
          />

          <LeadFormRequirements
            requirement={formData.requirement || {}}
            onRequirementChange={handleRequirementChange}
          />

          <div className="space-y-2">
            <Label htmlFor="remarks">Remarks</Label>
            <Textarea
              id="remarks"
              value={formData.remarks}
              onChange={(e) => handleInputChange("remarks", e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              {mode === "add" ? "Add Lead" : "Save Changes"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default LeadForm;