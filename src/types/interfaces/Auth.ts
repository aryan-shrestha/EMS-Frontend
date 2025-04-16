import { Employee } from "./Employee";
import { Organization } from "./Organization";

export interface User {
  id: number;
  email: string;
  date_joined: string;
  last_login: string;
  is_staff: boolean;
  is_active: boolean;
  is_superuser: boolean;
  employee: Employee;
  organization: Organization;
}
