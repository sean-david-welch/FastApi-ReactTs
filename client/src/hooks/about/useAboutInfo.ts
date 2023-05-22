import fetchData from '../../utils/fetchData';
import { useQuery } from '@tanstack/react-query';

const fetchAboutInfo = async () => {
    try {
        const response = await fetchData({
            endpoint: `about/`,
            method: 'GET',
        });
        return response;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw error;
        }
    }
};

const useFetchAboutInfo = () => {
    return useQuery(['infoItems'], fetchAboutInfo, {
        retry: false,
        staleTime: 1000 * 60 * 60 * 24,
    });
};

export default useFetchAboutInfo;
