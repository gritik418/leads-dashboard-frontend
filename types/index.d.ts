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
