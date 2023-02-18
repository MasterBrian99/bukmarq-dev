import { AuthLoginResponseI, AuthRequestI } from '../dto/auth.dto';
import httpClient from '../http/httpClient';

export const registerUser = async (data: AuthRequestI): Promise<string> => {
  const res = await httpClient.post('auth', data);
  return res.data as string;
};

export const loginUser = async (data: AuthRequestI): Promise<AuthLoginResponseI> => {
  const res = await httpClient.post('auth/login', data);
  return res.data as AuthLoginResponseI;
};

// export const removeEnrolmentStudent = async (params: {
//     data: EnrolmentRequestInterface;
//   }): Promise<CommonSuccessInterface> => {
//     const res = await apiClient.put(`enrolment/remove`, params.data);
//     return res.data as CommonSuccessInterface;
//   };
