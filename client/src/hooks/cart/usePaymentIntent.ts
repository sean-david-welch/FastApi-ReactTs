import fetchData from '../../utils/fetchData';
import { useCart } from './useCartContext';
import { useCustomer } from './useCustomerContext';

const usePaymentIntent = () => {
    const cartContext = useCart();
    const { customer } = useCustomer();

    const fetchClientSecret = async () => {
        if (cartContext.cart.length === 0) {
            return null;
        }

        const items = cartContext.cart.map(item => ({
            price: item.price,
            quantity: item.quantity,
        }));

        const data = {
            cart: items,
            customer: {
                name: customer.name,
                address: { ...customer.address },
            },
            receipt_email: customer.email,
        };

        const postData = await fetchData({
            endpoint: 'create-payment-intent',
            method: 'POST',
            data: JSON.stringify(data),
        });

        return postData.client_secret;
    };

    return {
        fetchClientSecret,
    };
};

export default usePaymentIntent;
