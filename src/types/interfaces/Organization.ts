export interface OrganizationType {
  id: number;
  name: string;
}

export interface Organization {
  id: number;
  name: string;
  type_of_organization: number;
  contact_number: string | null;
  admin_users: number[];
  opening_time: string | null;
  closing_time: string | null;
}

export interface Department {
  id: number;
  department_name: string;
  department_slug: string;
  parent_department: number | null;
}

export interface Designation {
  id: number;
  organization: number;
  title: string;
  slug: string;
  department: number;
}

export interface EmploymentType {
  id: number;
  organization: number;
  title: string;
  slug: string;
}

export interface SourceOfHire {
  id: number;
  organization: number;
  title: string;
  slug: string;
}
