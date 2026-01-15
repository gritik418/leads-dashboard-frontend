interface User {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  password?: string;
  createdAt: string;
  updatedAt: string;
}

enum Source {
  "Website",
  "Referral",
  "Ads",
  "Social",
}

enum Status {
  "New",
  "Contacted",
  "Converted",
  "Lost",
}

enum Stage {
  "Lead",
  "Qualified",
  "Proposal",
}

interface Lead {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  source: "Website" | "Referral" | "Ads" | "Social";
  status: "New" | "Contacted" | "Converted" | "Lost";
  stage: "Lead" | "Qualified" | "Proposal";
  createdAt: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface BaseResponse {
  success: boolean;
  message: string;
}

interface LoginResponse {
  success: boolean;
  message: string;
  errors?: Partial<LoginData>;
}

interface RegisterResponse {
  success: boolean;
  message: string;
  errors?: Partial<RegisterData>;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

interface UserProfileResponse {
  success: boolean;
  message: string;
  user: User;
}

interface DashboardStatsResponse {
  success: boolean;
  message: string;
  data?: Partial<{
    totalLeads: string;
    newLeads: string;
    qualifiedLeads: string;
    convertedLeads: string;
  }>;
}

interface DashboardStatsData {
  totalLeads?: string;
  newLeads?: string;
  qualifiedLeads?: string;
  convertedLeads?: string;
}

interface LeadsResponse {
  success: boolean;
  message: string;
  leads: Lead[];
  totalLeads: number;
  totalPages: number;
  currentPage: number;
}
