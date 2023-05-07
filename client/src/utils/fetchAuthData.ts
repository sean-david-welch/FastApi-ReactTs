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

        if (response.status < 200 || response.status >= 300) {
            const errorData = response;
            throw new Error(errorData.statusText || 'Error fetching data');
        }

        const responseData = response.data;

        return responseData;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export default fetchAuthData;
