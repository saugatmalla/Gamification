import axios, { AxiosInstance, AxiosResponse } from 'axios';

export interface PaginatedResponse<T> {
    error: false,
    statusCode: number
    msg?: string;
    total_results: number;
    total_pages: number;
    current_page: number;
    per_page: number;
    results: T[];
}

export interface HttpErrorResponseAttr {
    error: true;
    statusCode: number
    msg: string;
    error_name: string;
    details?: { [key: string]: any }
}

export interface HttpRequestHeaders {
    [key: string]: string;
}

declare module 'axios' {
    interface AxiosResponse<T = any> extends Promise<T & { error: boolean; msg?: string; statusCode: number }> { }
}

export class HttpClient {
    public readonly httpClient: AxiosInstance;

    public constructor(baseUrl: string, requestHeaders?: HttpRequestHeaders) {
        this.httpClient = axios.create({
            baseURL: baseUrl,
            headers: {
                'Content-Type': 'application/json',
                ...requestHeaders
            }
        })

        this._initializeResponseInterceptor();
    }

    private _initializeResponseInterceptor = () => {
        this.httpClient.interceptors.response.use(
            this._handleResponse,
            this._handleError,
        );
    };

    private _handleResponse = ({ data }: AxiosResponse): AxiosResponse & { error: false, statusCode: number } => {
        return {
            error: false,
            ...data
        };
    };

    protected _handleError = (error: any): HttpErrorResponseAttr => {
        let errorData: HttpErrorResponseAttr;

        if (axios.isAxiosError(error)) {
            let msg = error.message;

            if (error.response && error.response.status === 401) {
                // window.location.replace('/');
                console.log(error.response)
            }

            if (error.response && error.response.data && error.response.data.msg) {
                msg = error.response.data.msg;
            }

            errorData = {
                error: true,
                statusCode: error.response && error.response.status ? error.response.status : 500,
                error_name: `${error.name}: ${error.message}`,
                msg: msg,
                details: error.response || {},
            }
        } else {
            errorData = {
                error: true,
                statusCode: 500,
                error_name: 'Error',
                msg: 'An error occurred while processing the request. Please try again later',
            }
        }

        return errorData
    };
}