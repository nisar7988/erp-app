/**
 * Auth Module Type Definitions
 */

/** Available user roles for login */
export type UserRole = "Student" | "Teacher" | "Admin";

/** Login form field values */
export interface LoginFormState {
  email: string;
  password: string;
  role: UserRole;
  rememberMe: boolean;
}

/** Login API request payload */
export interface LoginPayload {
  email: string;
  password: string;
  role: UserRole;
}

/** Login API response shape */
export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    role: UserRole;
    name: string;
  };
}
