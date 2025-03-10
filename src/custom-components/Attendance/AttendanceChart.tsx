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
import useFetch from "@/hooks/useFetch";
import { useTheme } from "@/theme/theme-provide";

import { Bar, BarChart } from "recharts";

import { Loader2 } from "lucide-react";
import { AttendanceYearData } from "@/types/interfaces";

const AttendanceChart: React.FC = () => {
  const { theme } = useTheme();

  const chartConfig = {
    noOfPresentDays: {
      label: "No of present days",
      color: theme == "dark" ? "#FFFF" : "#171717",
    },
  } satisfies ChartConfig;

  const { data, loading } = useFetch<AttendanceYearData>(
    `attendance/my/yearly/`
  );

  let chartData = data?.data;

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <span>Yearly Attendance</span>
        </CardTitle>
        <CardDescription>
          <span>Attendance of current year ({data?.year})</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-[200px] md:h-[250px] xl:h-[350px] w-full flex items-center justify-center">
            <Loader2 className="animate-spin" />
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="h-[200px] md:h-[250px] xl:h-[350px]  w-full"
          >
            <BarChart accessibilityLayer data={chartData}>
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar
                dataKey="noOfPresentDays"
                fill="var(--color-noOfPresentDays)"
                radius={6}
              />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default AttendanceChart;
