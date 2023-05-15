import { FetchDataOptions } from '../Types/FetchTypes';
import { API_BASE_URL } from './config';
import axios from 'axios';

axios.defaults.baseURL = API_BASE_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';

const fetchData = async (options: FetchDataOptions) => {
    const { endpoint, method, data } = options;

    try {
        const response = await axios({
            method: method,
            url: endpoint,
            data: data,
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
