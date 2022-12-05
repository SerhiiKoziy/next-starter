import { LoginResponse } from 'models/auth/login-response.interface';
import { Login } from 'models/auth/login.class';
import { RequestPasswordReset } from 'models/auth/request-password-reset.class';
import { ResetPassword } from 'models/auth/reset-password.class';
import { PersonalInfoForm } from 'models/sign-up-flow/personal-info-form.class';
import { User } from 'models/users/user.class';
import api from './api';

export default class AuthService {
  get endpoint() {
    return '/auth';
  }

  async login(user: Login) {
    const response = await api.post<LoginResponse>(`${this.endpoint}/login`, user);
    return response.data;
  }

  async getCurrentUser() {
    const response = await api.get<User>('users/me');
    return response.data;
  }

  async register(user: User) {
    const response = await api.post<User>(`${this.endpoint}/register`, user);
    return response.data;
  }

  async signUpRegister(user: PersonalInfoForm) {
    const response = await api.post<PersonalInfoForm>(`${this.endpoint}/register`, user);
    return response.data;
  }

  async requestPasswordReset(input: RequestPasswordReset) {
    const response = await api.post<{ message: string }>(`${this.endpoint}/reset-password`, input);
    return response.data;
  }

  async resetPassword(input: ResetPassword) {
    const { password, token } = input;

    const response = await api.patch<User>(`${this.endpoint}/reset-password/${token}`, {
      password,
    });
    return response.data;
  }

  async createPassword(input: ResetPassword) {
    const { token, ...rest } = input;

    const response = await api.post<User>(`${this.endpoint}/password-create/${token}`, {
      ...rest,
    });
    return response.data;
  }

  async resendActivationMail(email: string) {
    await api.post<{ email: string }>(`${this.endpoint}/resend`, { email: email });
  }

  async activateAccount(token: string) {
    const response = await api.post<User>(`${this.endpoint}/activate`, { token });
    return response.data;
  }
}
