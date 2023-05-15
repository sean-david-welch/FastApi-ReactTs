import { FetchDataOptions } from '../Types/FetchTypes';
import { API_BASE_URL } from './config';
import axios from 'axios';

axios.defaults.baseURL = API_BASE_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';

const fetchData = async (options: FetchDataOptions) => {
    const { endpoint, method, data } = options;
    console.log(
        `Fetching data from endpoint: ${endpoint} with method: ${method}`
    );

    try {
        const response = await axios({
            method: method,
            url: endpoint,
            data: data,
        });

        console.log(`Response from ${endpoint}:`, response);

        if (response.status < 200 || response.status >= 300) {
            const errorData = response;
            console.log(`Error status from ${endpoint}:`, errorData);
            throw new Error(errorData.statusText || 'Error fetching data');
        }

        const responseData = response.data;

        return responseData;
    } catch (error: any) {
        console.log(
            `Error in fetchData for endpoint ${endpoint}:`,
            error.message
        );
        throw new Error(error.message);
    }
};

export default fetchData;
