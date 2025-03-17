import { Pie, PieChart } from "recharts";

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

import React from "react";
import NepaliDate from "nepali-date-converter";
import { Loader2 } from "lucide-react";

interface WorkingChartProps {
  isLoading: boolean;
  attendanceData: any;
}

const currentDate = new NepaliDate();

const WorkingChartProps: React.FC<WorkingChartProps> = ({
  isLoading,
  attendanceData,
}) => {
  const chartData = [
    {
      label: "present",
      monthlyWorkingHour: attendanceData?.total_working_hour,
      fill: "var(--chart-1)",
    },
    {
      label: "absent",
      monthlyWorkingHour: attendanceData?.remaining_working_hour,
      fill: "var(--chart-2)",
    },
  ];

  const chartConfig = {
    present: {
      label: "Present",
    },
    absent: {
      label: "Absent",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly working hour </CardTitle>
        <CardDescription>{currentDate.format("MMMM, YYYY")}</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-[200px] md:h-[250px] xl:h-[350px]"
        >
          {isLoading ? (
            <div className="h-full w-full flex items-center justify-center">
              <Loader2 className="animate-spin" />
            </div>
          ) : (
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="monthlyWorkingHour"
                nameKey="label"
              />
            </PieChart>
          )}
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default WorkingChartProps;
