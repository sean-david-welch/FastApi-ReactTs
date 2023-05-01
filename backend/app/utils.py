from typing import List
from models import CartItem
from fastapi import Request, Response, Depends, HTTPException, Request
from fastapi.security import OAuth2AuthorizationCodeBearer
from config import settings
import httpx
import stripe, stripe.error

endpoint_secret = settings["STRIPE_WEBHOOK_ENDPOINT_SECRET"]
OAUTH2_DOMAIN = settings["OAUTH2_DOMAIN"]


def calculate_cart_total(cart: List[CartItem]):
    total_price = 0

    for item in cart:
        price_in_cents = int(float(item.price) * 100)
        total_price += price_in_cents * item.quantity
    return total_price


async def get_current_user(request: Request):
    auth_header = request.headers.get("Authorization")
    if not auth_header:
        raise HTTPException(status_code=401, detail="Missing authorization header")

    token = auth_header.replace("Bearer ", "")

    url = f"https://{OAUTH2_DOMAIN}/userinfo"
    headers = {"Authorization": auth_header}
    response = await httpx.get(url, headers=headers)

    if response.status_code != 200:
        raise HTTPException(status_code=401, detail="Invalid token")

    user = response.json()
    return user, token


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
