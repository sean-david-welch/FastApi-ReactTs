from typing import List
from models import CartItem
from fastapi import Request, Response
from config import settings
from models import PaymentIntentData
import stripe.error
import stripe

endpoint_secret = settings["STRIPE_WEBHOOK_ENDPOINT_SECRET"]


###### Calculate cart total ######
def calculate_cart_total(cart: List[CartItem]):
    total_price = 0

    for item in cart:
        price_in_cents = int(float(item.price) * 100)
        total_price += price_in_cents * item.quantity
    return total_price


###### Stripe Payment Intent Functions ######
def create_customer(data: PaymentIntentData):
    stripe.api_key = settings["STRIPE_SECRET_KEY"]

    existing_customers = stripe.Customer.list(email=data.receipt_email).get("data")
    if existing_customers:
        return existing_customers[0]

    return stripe.Customer.create(
        name=data.customer.name,
        address={
            "line1": data.customer.address.line1,
            "line2": data.customer.address.line2,
            "city": data.customer.address.city,
            "state": data.customer.address.state,
            "postal_code": data.customer.address.postal_code,
            "country": data.customer.address.country,
        },
        email=data.receipt_email,
        shipping={
            "name": data.customer.name,
            "address": {
                "line1": data.customer.address.line1,
                "line2": data.customer.address.line2,
                "city": data.customer.address.city,
                "state": data.customer.address.state,
                "postal_code": data.customer.address.postal_code,
                "country": data.customer.address.country,
            },
        },
    )


def handle_stripe_error(e: stripe.error.StripeError):
    error_types = {
        stripe.error.CardError: "A card error occurred",
        stripe.error.RateLimitError: "Too many requests made to the API too quickly",
        stripe.error.InvalidRequestError: "Invalid parameters were supplied to Stripe's API",
        stripe.error.AuthenticationError: "Authentication with Stripe's API failed",
        stripe.error.APIConnectionError: "Network communication with Stripe failed",
        stripe.error.StripeError: "Display a very generic error to the user, and maybe send yourself an email",
        stripe.error.IdempotencyError: "Idempotency errors occur when an Idempotency-Key is re-used on a request that does not match the first request's API endpoint and parameters",
        stripe.error.StripeErrorWithParamCode: "Stripe error with param code",
    }
    error_type = type(e)
    error_message = error_types.get(error_type, "An unexpected error occurred")
    print(error_message, e)


def process_payment_intent(customer, calculated_total_amount, data):
    stripe.api_key = settings["STRIPE_SECRET_KEY"]
    return stripe.PaymentIntent.create(
        customer=customer["id"],
        setup_future_usage="off_session",
        amount=calculated_total_amount,
        currency="eur",
        automatic_payment_methods={"enabled": True},
        shipping=data.customer.dict(),
        receipt_email=data.receipt_email,
    )


###### Stripe Utility Functions ######
def charge_customer(customer_id, cart: List[CartItem]):
    payment_methods = stripe.PaymentMethod.list(customer=customer_id, type="card")
    calculated_total_amount = calculate_cart_total(cart)

    try:
        stripe.PaymentIntent.create(
            amount=calculated_total_amount,
            currency="eur",
            customer=customer_id,
            payment_method=payment_methods.data[0].id,
            off_session=True,
            confirm=True,
        )
    except stripe.error.CardError as e:
        err = e.error
        print("Code is: %s" % err.code)
        payment_intent_id = err.payment_intent["id"]
        payment_intent = stripe.PaymentIntent.retrieve(payment_intent_id)


async def verify_signature(request: Request, api_key_header: str):
    payload = await request.body()
    sig_header = api_key_header

    try:
        event = stripe.Webhook.construct_event(payload, sig_header, endpoint_secret)
    except ValueError as e:
        return Response(status_code=400)
    except stripe.error.SignatureVerificationError as e:
        return Response(status_code=400)
    return event
