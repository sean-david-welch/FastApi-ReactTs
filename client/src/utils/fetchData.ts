import axios from 'axios';
import { API_BASE_URL } from './config';
import { FetchDataOptions } from '../types/Types';

axios.defaults.baseURL = API_BASE_URL;

const fetchData = async (
    options: FetchDataOptions,
    token?: string,
    contentType: string = 'application/json'
) => {
    const { endpoint, method, data } = options;

    const headers = token
        ? {
              'Content-Type': contentType,
              Authorization: `Bearer ${token}`,
          }
        : { 'Content-Type': contentType };

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

export default fetchData;
