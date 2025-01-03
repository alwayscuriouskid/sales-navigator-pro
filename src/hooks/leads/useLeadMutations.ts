import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Lead, LeadDB, frontendToDB, dbToFrontend } from "@/types/leads";
import { toast } from "sonner";

export const useLeadMutations = () => {
  const queryClient = useQueryClient();

  const addLead = useMutation({
    mutationFn: async (newLead: Partial<Lead>) => {
      console.log("Adding new lead:", newLead);
      try {
        const dbLead = frontendToDB(newLead);
        console.log("Converted lead for DB:", dbLead);
        
        const { data, error } = await supabase
          .from('leads')
          .insert({
            client_name: newLead.clientName || '',
            contact_person: newLead.contactPerson || '',
            location: newLead.location || '',
            phone: newLead.phone || '',
            email: newLead.email || '',
            requirement: newLead.requirement || {},
            date: new Date().toISOString().split('T')[0],
            status: newLead.status || 'pending'
          })
          .select()
          .single();

        if (error) {
          console.error("Error adding lead:", error);
          throw error;
        }

        return dbToFrontend(data as LeadDB);
      } catch (error) {
        console.error("Error in addLead mutation:", error);
        if (error instanceof Error) {
          throw new Error(`Failed to add lead: ${error.message}`);
        }
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      toast.success("New lead has been successfully added.");
    },
    onError: (error) => {
      console.error("Error in addLead mutation:", error);
      toast.error(error instanceof Error ? error.message : "Failed to add lead. Please try again.");
    }
  });

  const updateLead = useMutation({
    mutationFn: async (updatedLead: Lead) => {
      console.log("Updating lead:", updatedLead);
      try {
        if (!updatedLead.id || typeof updatedLead.id !== 'string') {
          throw new Error("Invalid lead ID format");
        }

        const dbLead = frontendToDB(updatedLead);
        console.log("Converted lead for DB update:", dbLead);

        const { data, error } = await supabase
          .from('leads')
          .update({
            client_name: updatedLead.clientName,
            contact_person: updatedLead.contactPerson,
            location: updatedLead.location,
            phone: updatedLead.phone,
            email: updatedLead.email,
            requirement: updatedLead.requirement,
            status: updatedLead.status
          })
          .eq('id', updatedLead.id)
          .select()
          .single();

        if (error) {
          console.error("Error updating lead:", error);
          throw error;
        }

        return dbToFrontend(data as LeadDB);
      } catch (error) {
        console.error("Error in updateLead mutation:", error);
        if (error instanceof Error) {
          throw new Error(`Failed to update lead: ${error.message}`);
        }
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      toast.success("Lead has been successfully updated.");
    },
    onError: (error) => {
      console.error("Error in updateLead mutation:", error);
      toast.error(error instanceof Error ? error.message : "Failed to update lead. Please try again.");
    }
  });

  return {
    addLead,
    updateLead
  };
};