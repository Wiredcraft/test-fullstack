import { ApiActionsObjectLiteral, IApiActionsObjectLiteral } from "./actions";
import { ApiActionResult, ApiServiceActionToken } from "./actions/action-types";
import {
  GeneralApiResponse,
  GeneralApiResponseType
} from "./api-response.interface";

/**
 * @export
 * @abstract
 * @class AbstractApiService
 * @template I the api instance
 * @template C the api instance creator
 */
export abstract class AbstractApiService<I = any, C = any> {
  protected _apiInstance: I;
  private _baseConfig: C;
  private _actions: IApiActionsObjectLiteral<I, C>;
  constructor(baseConfig: C) {
    this._baseConfig = baseConfig;
  }

  private get _isInstantiated() {
    return this._apiInstance !== undefined;
  }

  // utils
  private _getGeneralResponse<D extends ApiActionResult>(
    data: D
  ): GeneralApiResponse<D> {
    return { kind: GeneralApiResponseType.OK, data };
  }
  protected abstract getGeneralProblem(r: any): GeneralApiResponse<null>;

  /**
   * get ready the instance
   *
   */
  public setup(creator: (c: C) => I, actions: IApiActionsObjectLiteral<I, C>) {
    if (this._isInstantiated) return;
    this._apiInstance = creator(this._baseConfig);
    this._actions = actions;
  }

  /**
   * dispatch an api action
   *
   * @template A ApiServiceActionToken
   * @template P payload of the action
   * @template D return data type of the action
   * @param {A} actionToken
   * @param {P} payload
   * @returns {Promise<GeneralApiResponse<D>>}
   * @memberof AbstractApiService
   */
  public async dispatch<
    A extends ApiServiceActionToken,
    P = Parameters<ApiActionsObjectLiteral[A]>[1],
    // Unpack type from promise<type>
    D = UnpackedType<ReturnType<ApiActionsObjectLiteral[A]>>
  >(actionToken: A, payload: P): Promise<GeneralApiResponse<D | null>> {
    try {
      const data: D = await this._actions[actionToken](this, payload);
      return this._getGeneralResponse<D>(data);
    } catch (e: any) {
      return this.getGeneralProblem(e);
    }
  }

  public abstract request<D>(opts: Partial<C>): Promise<D | undefined>;
}
