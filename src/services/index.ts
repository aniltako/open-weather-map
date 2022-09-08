import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import weatherAxios from "config/axios";

export const asyncFunc = <T>(request: AxiosRequestConfig) => {
  // Add authorization header configuration
  return weatherAxios
    .request<T>(request)
    .then((res: any) => {
      return [null, res?.data as T];
    })
    .catch((err: any) => {
      return [new CustomError(err) as CustomError, null];
    });
};

export class CustomError extends AxiosError {
  errorMessage: string;
  response: AxiosResponse | undefined;
  constructor({ message, code, config, request, response }: AxiosError) {
    super(message, code, config, request, response);
    this.response = response;
    this.errorMessage = response ? this.getErrorMessage(response) : null;
  }

  getErrorMessage(response: AxiosResponse) {
    return response.data.error;
  }
}
