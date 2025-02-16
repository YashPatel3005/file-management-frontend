export interface IAxiosError {
  response: {
    data: {
      message: string;
      error: string;
      statusCode: number;
    };
  };
}

export interface SessionData {
  accessToken: string;
}
export class Utils {
  public static handleError = (error: string | string[]) => {
    return typeof error === "string" ? error : error[0];
  };
}
