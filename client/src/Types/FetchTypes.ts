import { Method } from 'axios';

export interface FetchDataOptions {
    endpoint: string;
    method: Method;
    data?: any;
    params?: any;
}

export interface FetchAuthDataOptions extends FetchDataOptions {
    token?: string;
    contentType?: string;
}

export interface FetchProductOptions extends FetchDataOptions {
    isSingleProduct?: boolean;
}
