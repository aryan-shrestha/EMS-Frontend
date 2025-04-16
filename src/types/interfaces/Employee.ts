export interface Employee {
  id: number;
  user: number;
  organization: number;
  first_name: string;
  last_name: string;
  email: string;
  is_company_admin: boolean;
  is_active: boolean;
  contact_details: number;
  work_information: number;
  personal_information: number;
}

export interface PersonalInformation {
  id: number;
  date_of_birth: string;
  expertise: string | null;
  gender: string | null;
  marital_status: boolean;
  organization: number;
  employee: number;
}

export interface WorkInformation {
  id: number;
  ems_role: string;
  date_of_joining: string;
  organization: number;
  employee: number;
  department: number;
  designation: number;
  employment_type: number;
  source_of_hire: number;
}

export interface WorkExperience {
  id: number | null;
  organization: number | null;
  from_date: string;
  to_date: string;
  company_name: string;
  job_title: string;
  job_description: string;
  relevant: string;
  employee: string | number | undefined;
}

export interface Qualification {
  id?: number | string;
  organization?: number | string;
  employee?: number | string;
  start_date: string;
  end_date: string;
  college: string;
  degree: string;
  field_of_study: string;
}
