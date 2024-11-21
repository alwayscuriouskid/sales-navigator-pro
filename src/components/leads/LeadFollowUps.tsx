import { useState } from "react";
import { FollowUp } from "@/types/leads";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import NewFollowUpForm from "./NewFollowUpForm";
import { ScrollArea } from "@/components/ui/scroll-area";

interface LeadFollowUpsProps {
  leadId: string;
  followUps: FollowUp[];
  onFollowUpSubmit?: (followUp: FollowUp) => void;
}

const LeadFollowUps = ({ leadId, followUps = [], onFollowUpSubmit }: LeadFollowUpsProps) => {
  const [showNewForm, setShowNewForm] = useState(false);

  const handleFollowUpSubmit = (followUp: FollowUp) => {
    console.log("Submitting follow-up:", followUp);
    onFollowUpSubmit?.(followUp);
    setShowNewForm(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <h3 className="text-lg font-semibold">Follow-ups & Activities</h3>
        <Button
          onClick={() => setShowNewForm(!showNewForm)}
          variant="outline"
          size="sm"
          className="w-full sm:w-auto"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Follow-up
        </Button>
      </div>

      {showNewForm && (
        <Card className="border-dashed animate-fade-in">
          <CardContent className="pt-6">
            <NewFollowUpForm
              leadId={leadId}
              onCancel={() => setShowNewForm(false)}
              onSubmit={handleFollowUpSubmit}
            />
          </CardContent>
        </Card>
      )}

      <ScrollArea className="h-[400px] w-full rounded-md border p-4">
        <div className="space-y-4 pr-4">
          {followUps.length === 0 ? (
            <p className="text-sm text-muted-foreground">No follow-ups yet</p>
          ) : (
            followUps.map((followUp) => (
              <Card key={followUp.id} className="animate-fade-in">
                <CardHeader className="pb-2">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <CardTitle className="text-base font-medium">
                      {new Date(followUp.date).toLocaleDateString()}
                    </CardTitle>
                    {followUp.nextFollowUpDate && (
                      <span className="text-sm text-muted-foreground">
                        Next: {new Date(followUp.nextFollowUpDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-2">{followUp.notes}</p>
                  <p className="text-sm text-muted-foreground">
                    Outcome: {followUp.outcome}
                  </p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default LeadFollowUps;