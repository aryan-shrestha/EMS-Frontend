import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { Bar, BarChart, XAxis } from "recharts";

import { Loader2 } from "lucide-react";
import { Attendance } from "@/types/interfaces";

interface AttendanceChartProps {
  isLoading: boolean;
  attendanceData: Attendance[];
}

const AttendanceChart: React.FC<AttendanceChartProps> = ({
  isLoading,
  attendanceData,
}) => {
  const chartConfig = {
    presentDays: {
      label: "No of days",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <span>Yearly Attendance</span>
        </CardTitle>
        <CardDescription>
          <span>Attendance of year 2081</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="h-[200px] md:h-[250px] xl:h-[350px]  w-full"
        >
          {isLoading ? (
            <div className="h-full w-full flex items-center justify-center">
              <Loader2 className="animate-spin" />
            </div>
          ) : (
            <BarChart accessibilityLayer data={attendanceData}>
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Bar
                dataKey="present_days"
                fill="var(--color-presentDays)"
                radius={6}
              />
            </BarChart>
          )}
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default AttendanceChart;
