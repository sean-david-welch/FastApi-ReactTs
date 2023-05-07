import axios from 'axios';
import { API_BASE_URL } from './config';
import { FetchAuthDataOptions } from '../types/Types';

axios.defaults.baseURL = API_BASE_URL;

const fetchAuthData = async (options: FetchAuthDataOptions) => {
    const {
        endpoint,
        method,
        data,
        token,
        contentType = 'application/json',
    } = options;

    const headers = {
        'Content-Type': contentType,
        Authorization: `Bearer ${token}`,
    };

    try {
        const response = await axios({
            method: method,
            url: endpoint,
            data: data,
            headers: headers,
            withCredentials: true,
        });

        const responseData = response.data;

        return responseData;
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            return { is_authenticated: false };
        } else {
            throw new Error(error.message);
        }
    }
};

export default fetchAuthData;
