import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

interface StatusMetric {
  status: string;
  count: number;
  quantity: number;
}

export const StatusAnalytics = ({ zoneFilter, typeFilter }: { zoneFilter: string; typeFilter: string }) => {
  const { data: statusMetrics } = useQuery<StatusMetric[]>({
    queryKey: ['inventory-status-metrics', zoneFilter, typeFilter],
    queryFn: async () => {
      console.log('Fetching inventory status metrics');
      
      let query = supabase
        .from('inventory_items')
        .select(`
          status,
          count,
          quantity
        `, { 
          count: 'exact',
          head: false 
        });
      
      // Apply filters if provided
      if (zoneFilter !== 'all') {
        query = query.eq('sectors.zone_id', zoneFilter);
      }
      if (typeFilter !== 'all') {
        query = query.eq('type_id', typeFilter);
      }

      const { data: statusData, error } = await query;

      if (error) {
        console.error('Error fetching status distribution:', error);
        throw error;
      }

      // Transform and aggregate the data
      const aggregatedData = statusData.reduce((acc: Record<string, StatusMetric>, item) => {
        if (!acc[item.status]) {
          acc[item.status] = {
            status: item.status,
            count: 0,
            quantity: 0
          };
        }
        acc[item.status].count += 1;
        acc[item.status].quantity += item.quantity;
        return acc;
      }, {});

      return Object.values(aggregatedData);
    },
  });

  const pieData = statusMetrics?.map(metric => ({
    name: metric.status,
    value: metric.count
  })) || [];

  const barData = statusMetrics?.map(metric => ({
    name: metric.status,
    quantity: metric.quantity
  })) || [];

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Inventory Status Distribution</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="quantity" fill="#8884d8" name="Quantity" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};