import fetchData from './fetchData';

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

export default fetchStaticContent;
