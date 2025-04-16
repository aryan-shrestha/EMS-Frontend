import React from "react";
import { useParams } from "react-router";
import BasicInformation from "./components/BasicInformation";
import { Employee } from "@/types/interfaces/Employee";
import { GET } from "@/axios/axios";
import PersonalInformationForm from "./components/PersonalInformation";
import WorkInformationForm from "./components/WorkInformation";
import WorkExperiences from "./components/WorkExperiences";
import Qualifications from "./components/Qualifications";

const EmployeeUpdate: React.FC = () => {
  const [employee, setEmployee] = React.useState<Employee | undefined>(
    undefined
  );
  const { id } = useParams();

  const getEmployee = React.useCallback(async () => {
    if (!id) return;
    await GET(`employees/${id}/`, {}, (data: Employee) => {
      setEmployee(data);
    });
  }, [id]);

  React.useEffect(() => {
    getEmployee();
  }, []);

  return (
    <>
      <div className="space-y-6">
        <BasicInformation employeeId={employee?.id} />
        <PersonalInformationForm
          personalInformationId={employee?.personal_information}
        />
        <WorkInformationForm workInformationId={employee?.work_information} />
        <WorkExperiences employeeId={employee?.id} />
        <Qualifications employeeId={employee?.id} />
      </div>
    </>
  );
};

export default EmployeeUpdate;
