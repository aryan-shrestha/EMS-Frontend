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
import { useTheme } from "@/theme/theme-provide";

export default function WorkingHourChart() {
  const { theme } = useTheme();

  const chartData = [
    {
      label: "present",
      monthlyWorkingHour: 77.5,
      fill: theme == "dark" ? "#FFFF" : "#171717",
    },
    {
      label: "absent",
      monthlyWorkingHour: 104.62,
      fill: "#939395",
    },
  ];

  const chartConfig = {
    monthlyWorkingHour: {
      label: "Visitors",
    },
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
        <CardDescription>Falgun, 2081</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-[200px] md:h-[250px] xl:h-[350px]"
        >
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
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
