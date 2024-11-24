import { Table, TableBody } from "@/components/ui/table";
import TeamActivityFilters from "./TeamActivityFilters";
import TeamActivityTableHeader from "./TeamActivityTableHeader";
import TeamActivityRow from "./TeamActivityRow";
import { useTeamActivities } from "./team-activities/useTeamActivities";
import { useActivityFilters } from "./team-activities/useActivityFilters";
import { useEffect, useState } from "react";

const TeamActivityTable = () => {
  const [sortBy, setSortBy] = useState("date_desc");
  const [nextActionDateFilter, setNextActionDateFilter] = useState<Date>();
  
  const { 
    activities,
    filteredActivities,
    setFilteredActivities,
    selectedDate,
    setSelectedDate,
    selectedTeamMember,
    setSelectedTeamMember,
    activityType,
    setActivityType,
    leadSearch,
    setLeadSearch,
    visibleColumns,
    setVisibleColumns,
    applyFilters
  } = useActivityFilters();

  const { data: fetchedActivities } = useTeamActivities(
    selectedTeamMember,
    activityType,
    leadSearch,
    selectedDate,
    nextActionDateFilter
  );

  const sortActivities = (activities: any[]) => {
    return [...activities].sort((a, b) => {
      switch (sortBy) {
        case "date_asc":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "date_desc":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "next_action_asc":
          return new Date(a.activityNextActionDate || 0).getTime() - new Date(b.activityNextActionDate || 0).getTime();
        case "next_action_desc":
          return new Date(b.activityNextActionDate || 0).getTime() - new Date(a.activityNextActionDate || 0).getTime();
        default:
          return 0;
      }
    });
  };

  useEffect(() => {
    if (fetchedActivities) {
      const filtered = applyFilters(fetchedActivities);
      const sorted = sortActivities(filtered);
      setFilteredActivities(sorted);
    }
  }, [fetchedActivities, selectedTeamMember, activityType, leadSearch, selectedDate, nextActionDateFilter, sortBy]);

  return (
    <div className="space-y-4">
      <TeamActivityFilters
        selectedDate={selectedDate}
        onDateSelect={setSelectedDate}
        selectedTeamMember={selectedTeamMember}
        onTeamMemberSelect={setSelectedTeamMember}
        activityType={activityType}
        onActivityTypeSelect={setActivityType}
        leadSearch={leadSearch}
        onLeadSearchChange={setLeadSearch}
        visibleColumns={visibleColumns}
        onToggleColumn={(columnKey) => 
          setVisibleColumns(prev => ({ ...prev, [columnKey]: !prev[columnKey] }))
        }
        sortBy={sortBy}
        onSortChange={setSortBy}
        nextActionDateFilter={nextActionDateFilter}
        onNextActionDateSelect={setNextActionDateFilter}
      />

      <Table>
        <TeamActivityTableHeader visibleColumns={visibleColumns} />
        <TableBody>
          {filteredActivities.map((activity) => (
            <TeamActivityRow 
              key={activity.id}
              activity={activity}
              visibleColumns={visibleColumns}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TeamActivityTable;