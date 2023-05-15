// import { useState } from 'react';
// import { useCustomer } from '../../hooks/cart/useCustomerContext';
// import { Address, CheckoutFormProps } from '../../Types/CartTypes';
// import { useStripe, useElements } from '@stripe/react-stripe-js';
// import PaymentForm from './PaymentForm';
// import AddressForm from './AddressForm';
// import usePaymentProcessor from '../../hooks/cart/usePaymentProcessor';

// const CheckoutForm: React.FC<CheckoutFormProps> = ({
//     totalAmount,
//     clientSecret,
// }) => {
//     const { setCustomer } = useCustomer();
//     const stripe = useStripe();
//     const elements = useElements();
//     const [addressFormSubmitted, setAddressFormSubmitted] = useState(false);

//     const { message, isLoading, handlePayment } = usePaymentProcessor({
//         stripe,
//         elements,
//         clientSecret,
//     });

//     const handleSubmit = (data: {
//         name: string;
//         email: string;
//         address: Address;
//     }) => {
//         setCustomer(prev => ({
//             ...prev,
//             email: data.email,
//             address: data.address,
//         }));
//         setAddressFormSubmitted(true);
//     };

//     return (
//         <div className="stripe-form">
//             {!addressFormSubmitted ? (
//                 <AddressForm onSubmit={handleSubmit} />
//             ) : (
//                 <PaymentForm
//                     handleSubmit={handlePayment}
//                     isLoading={isLoading}
//                     stripe={stripe}
//                     elements={elements}
//                     totalAmount={totalAmount}
//                 />
//             )}
//             {message && <div id="payment-message">{message}</div>}
//         </div>
//     );
// };

// export default CheckoutForm;
