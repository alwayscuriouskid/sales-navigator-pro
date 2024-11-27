import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lead } from "@/types/leads";

interface BasicInformationProps {
  formData: Partial<Lead>;
  onInputChange: (field: keyof Lead, value: any) => void;
}

export const BasicInformation = ({ formData, onInputChange }: BasicInformationProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="clientName">Client Name</Label>
        <Input
          id="clientName"
          value={formData.clientName}
          onChange={(e) => onInputChange("clientName", e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          value={formData.location}
          onChange={(e) => onInputChange("location", e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contactPerson">Contact Person</Label>
        <Input
          id="contactPerson"
          value={formData.contactPerson}
          onChange={(e) => onInputChange("contactPerson", e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          value={formData.phone}
          onChange={(e) => onInputChange("phone", e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => onInputChange("email", e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="budget">Budget</Label>
        <Input
          id="budget"
          value={formData.budget}
          onChange={(e) => onInputChange("budget", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="leadRef">Lead Reference</Label>
        <Input
          id="leadRef"
          value={formData.leadRef}
          onChange={(e) => onInputChange("leadRef", e.target.value)}
          placeholder="Enter reference person name"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="leadSource">Lead Source</Label>
        <Input
          id="leadSource"
          value={formData.leadSource}
          onChange={(e) => onInputChange("leadSource", e.target.value)}
          placeholder="Enter lead source"
        />
      </div>
    </div>
  );
};