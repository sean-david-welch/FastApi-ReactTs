import fetchData from '../../utils/fetchData';

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

export default fetchAboutInfo;
