export interface Salary {
  employee: number;
  basic_salary: number;
  remote_salary: number;
}

export interface Transaction {
  id: number;
  organization: number;
  employee: number;
  salary: number;
  fiscal_year: string;
  date: string;
  status: string;
  net_salary: string;
}
