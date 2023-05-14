from typing import List
from models import CartItem
from fastapi import Request, Response
from config import settings
import stripe.error

endpoint_secret = settings["STRIPE_WEBHOOK_ENDPOINT_SECRET"]


def calculate_cart_total(cart: List[CartItem]):
    total_price = 0

    for item in cart:
        price_in_cents = int(float(item.price) * 100)
        total_price += price_in_cents * item.quantity
    return total_price


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
