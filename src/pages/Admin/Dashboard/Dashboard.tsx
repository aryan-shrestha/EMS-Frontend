import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AuthContext from "@/context/AuthContext";

import NepaliDate from "nepali-date-converter";
import React from "react";

const nepaliMonths = [
  "Baisakh",
  "Jestha",
  "Asar",
  "Shrawan",
  "Bhadra",
  "Ashwin",
  "Kartik",
  "Mangsir",
  "Poush",
  "Magh",
  "Falgun",
  "Chaitra",
];

const getNepaliYears = () => {
  const currentYear = new NepaliDate().getYear();
  return Array.from({ length: 5 }, (_, i) => currentYear - i);
};

const Dashboard: React.FC = () => {
  const auth = React.useContext(AuthContext);

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [selectedDate, setSelectedDate] = React.useState({
    year: new NepaliDate().getYear().toString(),
    month: (new NepaliDate().getMonth() + 1).toString(),
  });

  return (
    <div className="grid gap-6 grid-cols-4">
      <Card className="col-span-4 xl:col-span-4">
        <CardContent>
          <div className="flex flex-col gap-6 justify-between md:flex-row md:items-center md:gap-0">
            <h1 className="text-2xl font-bold capitalize text-gray-900 dark:text-white">
              Good morning {auth?.user?.employee?.first_name}!
            </h1>
            <form className="flex gap-4 pt-2">
              <Select
                value={selectedDate.year}
                onValueChange={(year) =>
                  setSelectedDate({ ...selectedDate, year })
                }
                disabled={isLoading}
              >
                <SelectTrigger className="w-[80px]">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  {getNepaliYears().map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={selectedDate.month}
                onValueChange={(month) =>
                  setSelectedDate({ ...selectedDate, month })
                }
                disabled={isLoading}
              >
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Select month" />
                </SelectTrigger>
                <SelectContent>
                  {nepaliMonths.map((month, index) => (
                    <SelectItem key={index} value={`${index + 1}`}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </form>
          </div>
        </CardContent>
      </Card>
      <Card className="col-span-4 lg:col-span-2 xl:col-span-1">
        <CardHeader>
          <CardTitle>Attendance</CardTitle>
        </CardHeader>
        <CardContent>
          <span className="text-3xl">8</span>
        </CardContent>
        <CardFooter>
          <CardDescription>
            8 employees are have checked-in today
          </CardDescription>
        </CardFooter>
      </Card>
      <Card className="col-span-4 lg:col-span-2 xl:col-span-1">
        <CardHeader>
          <CardTitle>Leave approvals</CardTitle>
        </CardHeader>
        <CardContent>
          <span className="text-3xl">5</span>
        </CardContent>
        <CardFooter>
          <CardDescription>5 pending leave approvals</CardDescription>
        </CardFooter>
      </Card>
      <Card className="col-span-4 lg:col-span-2 xl:col-span-1">
        <CardHeader>
          <CardTitle>Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <span className="text-3xl">10</span>
        </CardContent>
        <CardFooter>
          <CardDescription>10 on going projects</CardDescription>
        </CardFooter>
      </Card>
      <Card className="col-span-4 lg:col-span-2 xl:col-span-1">
        <CardHeader>
          <CardTitle>Employees</CardTitle>
        </CardHeader>
        <CardContent>
          <span className="text-3xl">12</span>
        </CardContent>
        <CardFooter>
          <CardDescription>10 active employees</CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Dashboard;
