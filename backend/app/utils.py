from typing import List
from models import CartItem
from fastapi import Depends, HTTPException, status, Request, Response
from config import settings
import stripe.error

endpoint_secret = settings["STRIPE_WEBHOOK_ENDPOINT_SECRET"]
OAUTH2_DOMAIN = settings["OAUTH2_DOMAIN"]


def calculate_cart_total(cart: List[CartItem]):
    total_price = 0

    for item in cart:
        price_in_cents = int(float(item.price) * 100)
        total_price += price_in_cents * item.quantity
    return total_price


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
