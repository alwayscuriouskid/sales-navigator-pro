import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";

export type DateRangeType = "all" | "today" | "week" | "month" | "custom";

interface SalesFiltersProps {
  dateRange: DateRangeType;
  setDateRange: (value: DateRangeType) => void;
  startDate: Date | undefined;
  setStartDate: (date: Date | undefined) => void;
  endDate: Date | undefined;
  setEndDate: (date: Date | undefined) => void;
  minRevenue: string;
  setMinRevenue: (value: string) => void;
  maxRevenue: string;
  setMaxRevenue: (value: string) => void;
  selectedInventoryType: string;
  setSelectedInventoryType: (value: string) => void;
  minSales: string;
  setMinSales: (value: string) => void;
  maxSales: string;
  setMaxSales: (value: string) => void;
  inventoryTypes: Array<{ name: string }>;
}

export const SalesFilters = ({
  dateRange,
  setDateRange,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  minRevenue,
  setMinRevenue,
  maxRevenue,
  setMaxRevenue,
  selectedInventoryType,
  setSelectedInventoryType,
  minSales,
  setMinSales,
  maxSales,
  setMaxSales,
  inventoryTypes,
}: SalesFiltersProps) => {
  return (
    <Card className="p-4">
      <CardHeader>
        <CardTitle>Filters</CardTitle>
        <CardDescription>Refine your sales analytics</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Date Range</label>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger>
                <SelectValue placeholder="Select date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">Last 7 Days</SelectItem>
                <SelectItem value="month">Last 30 Days</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
            {dateRange === "custom" && (
              <div className="flex gap-2 mt-2">
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

          <div className="space-y-2">
            <label className="text-sm font-medium">Revenue Range (₹)</label>
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Min"
                value={minRevenue}
                onChange={(e) => setMinRevenue(e.target.value)}
              />
              <Input
                type="number"
                placeholder="Max"
                value={maxRevenue}
                onChange={(e) => setMaxRevenue(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Sales Range (Units)</label>
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Min"
                value={minSales}
                onChange={(e) => setMinSales(e.target.value)}
              />
              <Input
                type="number"
                placeholder="Max"
                value={maxSales}
                onChange={(e) => setMaxSales(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Inventory Type</label>
            <Select value={selectedInventoryType} onValueChange={setSelectedInventoryType}>
              <SelectTrigger>
                <SelectValue placeholder="Select inventory type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {inventoryTypes.map((item: any) => (
                  <SelectItem key={item.name} value={item.name}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};