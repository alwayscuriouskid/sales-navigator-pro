import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { useState, useEffect } from "react";

interface ActivityFiltersProps {
  onFilterChange: (filters: {
    timeRange: string;
    startDate?: Date;
    endDate?: Date;
  }) => void;
}

const ActivityFilters = ({ onFilterChange }: ActivityFiltersProps) => {
  const [timeRange, setTimeRange] = useState("today");
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();

  useEffect(() => {
    console.log("Filters changed:", { timeRange, startDate, endDate });
    onFilterChange({
      timeRange,
      startDate,
      endDate,
    });
  }, [timeRange, startDate, endDate, onFilterChange]);

  return (
    <div className="flex flex-wrap items-center gap-4 mb-6">
      <Select value={timeRange} onValueChange={setTimeRange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select time range" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="today">Today</SelectItem>
          <SelectItem value="yesterday">Yesterday</SelectItem>
          <SelectItem value="thisWeek">This Week</SelectItem>
          <SelectItem value="lastWeek">Last Week</SelectItem>
          <SelectItem value="thisMonth">This Month</SelectItem>
          <SelectItem value="custom">Custom Range</SelectItem>
        </SelectContent>
      </Select>

      {timeRange === "custom" && (
        <div className="flex gap-2">
          <DatePicker
            selected={startDate}
            onSelect={setStartDate}
            placeholderText="Start date"
          />
          <DatePicker
            selected={endDate}
            onSelect={setEndDate}
            placeholderText="End date"
          />
        </div>
      )}
    </div>
  );
};

export default ActivityFilters;