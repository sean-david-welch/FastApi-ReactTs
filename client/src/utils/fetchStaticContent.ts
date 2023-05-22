import fetchData from './fetchData';
import { useQuery } from '@tanstack/react-query';

const fetchStaticContent = async (name: string) => {
    try {
        const response = await fetchData({
            endpoint: `content/${name}`,
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

const useFetchStaticContent = (contentName: string, type: string) => {
    return useQuery(
        [`${contentName}.${type}`],
        () => fetchStaticContent(contentName),
        {
            retry: false,
            staleTime: 1000 * 60 * 60 * 24,
        }
    );
};

export default useFetchStaticContent;
