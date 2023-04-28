from fastapi import FastAPI, HTTPException, status, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from typing import List

from utils import calculate_cart_total
from models import Product, ProductUpdate, CartItem
from database import (
    fetch_all_products,
    fetch_product,
    post_product,
    put_product,
    delete_product,
)

import os
from dotenv import load_dotenv

load_dotenv()

import stripe

stripe.api_key = os.environ.get("STRIPE_SECRET_KEY")

app = FastAPI()
app.mount("/images", StaticFiles(directory="images"), name="images")
origins = ["http://localhost:3000", "http://localhost:8000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return RedirectResponse(url="/docs")


@app.get("/api/products")
async def get_products():
    response = await fetch_all_products()
    return response


@app.get("/api/products/{product_id}", response_model=Product)
async def get_product(product_id: str):
    print(f"Received request for product ID: {product_id}")
    response = await fetch_product(product_id)
    if response:
        return response
    raise HTTPException(status_code=404, detail=f"Product: {product_id} not found")


@app.post("/api/products", response_model=Product)
async def create_product(product: Product):
    response = await post_product(product.dict())
    if response:
        return response
    raise HTTPException(
        status_code=400, detail="Product not created, something went wrong :("
    )


@app.put("/api/products/{product_id}", response_model=Product)
async def update_product(product_id: str, product: ProductUpdate):
    response = await put_product(product_id, product.dict(exclude_unset=True))
    if response:
        return response
    raise HTTPException(status_code=404, detail=f"Product: {product_id} not found")


@app.delete("/api/products/{product_id}")
async def remove_product(product_id: str):
    response = await delete_product(product_id)
    if response:
        return response
    raise HTTPException(status_code=404, detail=f"Product: {product_id} not found")


@app.post("/create-payment-intent")
async def create_payment_intent(cart: List[CartItem]):
    if not cart:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Cart is empty"
        )

    calculated_total_amount = calculate_cart_total(cart)
    try:
        payment_intent = stripe.PaymentIntent.create(
            amount=calculated_total_amount,
            currency="eur",
            automatic_payment_methods={"enabled": True},
        )
        print("Payment intent created:", payment_intent)
        return JSONResponse({"client_secret": payment_intent.client_secret})
    except (Exception, stripe.error.CardError) as e:
        error_message = str(e) if isinstance(e, Exception) else e.user_message
        print("Error:", error_message)
        return JSONResponse(
            content={"error": error_message}, status_code=status.HTTP_400_BAD_REQUEST
        )
