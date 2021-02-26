import { ApiResponse, ApisauceConfig, ApisauceInstance } from "apisauce";
import { AbstractApiService } from "store/api-service";
import { generalApiProblemStore as problemStore } from "../../store/api-service";

/**
 * Manages all requests to the API.
 */
export class ApiService extends AbstractApiService<
  ApisauceInstance,
  ApisauceConfig
> {
  protected getGeneralProblem(response: ApiResponse<any>) {
    // const isResponseInstance = response instanceof ApisauceInstance
    switch (response.problem) {
      case "CONNECTION_ERROR":
        return problemStore.CONNECTION_ERROR;
      case "NETWORK_ERROR":
        return problemStore.CONNECTION_ERROR;
      case "TIMEOUT_ERROR":
        return problemStore.TIMEOUT;
      case "SERVER_ERROR":
        return problemStore.SERVER_ERROR;
      case "UNKNOWN_ERROR":
        return problemStore.UNKNOWN;
      case "CLIENT_ERROR":
        switch (response.status) {
          case 401:
            return problemStore.UNAUTHORIZED;
          case 403:
            return problemStore.FORBIDDEN;
          case 404:
            return problemStore.NOT_FOUND;
          default:
            return problemStore.REJECTED;
        }
      case "CANCEL_ERROR":
        return null;
    }
    return null;
  }

  public async request<D>(config: Partial<ApisauceConfig>): Promise<D> {
    const response = await this._apiInstance.any<D>(config);
    // let the getGeneralProblem resolve the error response
    if (!response.ok) throw response;
    // @ts-ignore
    else return response.data;
  }
}
