import { useLocation, Link } from "react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";

const AppBreadcrumb = () => {
  const location = useLocation();
  const pathSegments = location.pathname
    .split("/")
    .filter((segment: string) => segment);

  // Mapping URL segments to readable breadcrumb labels
  const breadcrumbLabels: Record<string, string> = {
    "": "Dashboard",
    attendance: "Attendance",
    feedback: "Feedback",
    "leave-tracker": "Leave Tracker",
    noticeboard: "Noticeboard",
    "salary-tracker": "Salary Tracker",
    "task-tracker": "Task Tracker",
  };

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* Dashboard (Root Path) */}
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/">Dashboard</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {pathSegments.map((segment: string, index: number) => {
          const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
          const isLast = index === pathSegments.length - 1;
          const label = breadcrumbLabels[segment] || segment;

          return (
            <React.Fragment key={path}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={path}>{label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default AppBreadcrumb;
