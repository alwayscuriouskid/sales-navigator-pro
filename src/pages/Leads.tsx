import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Lead } from "@/types/leads";
import LeadsHeader from "@/components/leads/LeadsHeader";
import LeadsFilters from "@/components/leads/LeadsFilters";
import LeadsTable from "@/components/leads/LeadsTable";
import LeadForm from "@/components/leads/LeadForm";
import { useLeads } from "@/hooks/useLeads";

const Leads = () => {
  const { leads, isLoading, addLead, updateLead } = useLeads();
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState<Date>();
  const [locationFilter, setLocationFilter] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [customStatuses, setCustomStatuses] = useState<string[]>([]);
  const [visibleColumns, setVisibleColumns] = useState({
    date: true,
    clientName: true,
    location: true,
    contactPerson: true,
    phone: true,
    email: true,
    requirements: true,
    status: true,
    remarks: true,
    budget: true,
    leadRef: true,
    leadSource: true,
    priceQuoted: true,
    activityType: true,
    activityOutcome: true,
    activityNextAction: true,
    activityNextActionDate: true
  });

  const handleAddLead = async (newLead: Partial<Lead>) => {
    await addLead.mutateAsync({
      ...newLead,
      requirement: newLead.requirement || {},
      date: newLead.date || new Date().toISOString().split('T')[0],
    });
    setShowAddForm(false);
  };

  const handleUpdateLead = async (updatedLead: Lead) => {
    await updateLead.mutateAsync(updatedLead);
  };

  const handleAddCustomStatus = (status: string) => {
    setCustomStatuses(prev => [...prev, status]);
  };

  const toggleColumn = (column: keyof typeof visibleColumns) => {
    setVisibleColumns(prev => ({
      ...prev,
      [column]: !prev[column]
    }));
  };

  const filteredLeads = leads
    .filter(lead => statusFilter === "all" || lead.status === statusFilter)
    .filter(lead => {
      if (dateFilter) {
        const leadDate = new Date(lead.date);
        return leadDate.toDateString() === dateFilter.toDateString();
      }
      return true;
    })
    .filter(lead => 
      locationFilter ? lead.location.toLowerCase().includes(locationFilter.toLowerCase()) : true
    )
    .filter(lead =>
      searchQuery
        ? lead.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          lead.contactPerson.toLowerCase().includes(searchQuery.toLowerCase())
        : true
    );

  if (isLoading) {
    return <div>Loading leads...</div>;
  }

  return (
    <div className="space-y-4 w-full max-w-[calc(100vw-280px)] pr-6">
      <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <LeadForm
            onSubmit={handleAddLead}
            onCancel={() => setShowAddForm(false)}
            customStatuses={customStatuses}
            onAddCustomStatus={handleAddCustomStatus}
          />
        </DialogContent>
      </Dialog>

      <LeadsHeader onAddNew={() => setShowAddForm(true)} />

      <LeadsFilters
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        visibleColumns={visibleColumns}
        toggleColumn={toggleColumn}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        locationFilter={locationFilter}
        setLocationFilter={setLocationFilter}
      />

      <Card className="p-6 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <LeadsTable
          leads={filteredLeads}
          visibleColumns={visibleColumns}
          onUpdateLead={handleUpdateLead}
          customStatuses={customStatuses}
        />
      </Card>
    </div>
  );
};

export default Leads;