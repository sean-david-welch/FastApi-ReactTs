from fastapi import FastAPI, HTTPException, status, Request, Response, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse, JSONResponse
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.staticfiles import StaticFiles
from typing import List
from datetime import timedelta
import stripe
from config import settings
from utils import calculate_cart_total, verify_signature
from security import (
    ACCESS_TOKEN_EXPIRE_MINUTES,
    get_password_hash,
    authenticate_user,
    create_access_token,
    is_authenticated,
    get_current_user,
)

from models import (
    Product,
    ProductUpdate,
    CartItem,
    Token,
    User,
    UserCreate,
    UserDB,
    UserEdit,
)
from database import (
    fetch_all_products,
    fetch_product,
    post_product,
    put_product,
    delete_product,
    get_user,
    create_user,
    update_user,
    delete_user,
    get_user_by_id,
)

app = FastAPI()
app.mount("/images", StaticFiles(directory="images"), name="images")
origins = ["http://localhost:3000", "http://localhost:5000", "http://localhost:8000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#######################
#### API Endpoints ####
#######################


########################
######### HOME #########
########################
@app.get("/")
def root() -> RedirectResponse:
    return RedirectResponse(url="/docs")


########################
###### AUTH CRUD #######
########################
@app.post("/api/register")
async def register(user: UserCreate, current_user: User = Depends(get_current_user)):
    if not current_user.is_superuser:
        raise HTTPException(status_code=403, detail="Permission denied")

    existing_user = await get_user(user.username)
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already exists")

    hashed_password = get_password_hash(user.password)
    user_db = UserDB(**user.dict(), hashed_password=hashed_password)
    await create_user(user_db)

    return {"message": "User created successfully"}


@app.delete("/api/users/{user_id}")
async def delete_user_account(
    user_id: str, current_user: User = Depends(get_current_user)
):
    if not current_user.is_superuser:
        raise HTTPException(status_code=403, detail="Permission denied")

    await delete_user(user_id)
    return {"message": "User deleted successfully"}


@app.put("/api/users/{user_id}", response_model=UserDB)
async def edit_user_account(
    user_id: str, user: UserEdit, current_user: User = Depends(get_current_user)
):
    if not current_user.is_superuser:
        raise HTTPException(status_code=403, detail="Permission denied")

    user_data = user.dict(exclude_unset=True)
    if "password" in user_data:
        user_data["hashed_password"] = get_password_hash(user_data.pop("password"))

    await update_user(user_id, user_data)
    updated_user = await get_user_by_id(user_id)
    return updated_user


########################
######### AUTH #########
########################
@app.post("/api/login", response_model=Token)
async def login(response: Response, form_data: OAuth2PasswordRequestForm = Depends()):
    user = await authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )

    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
    )

    return {"access_token": access_token, "token_type": "bearer"}


@app.post("/api/logout")
async def logout(response: Response):
    response.delete_cookie("access_token")
    return {"message": "Logged out successfully"}


@app.get("/api/current_user", response_model=User)
async def return_current_user(current_user: User = Depends(get_current_user)):
    return current_user


@app.get("/api/is-authenticated")
async def get_authentication_status(authenticated: bool = Depends(is_authenticated)):
    return {"is_authenticated": authenticated}


@app.get("/api/is-superuser")
async def get_superuser_status(current_user: User = Depends(get_current_user)):
    return {"is_superuser": current_user.is_superuser}


############################
######### PRODUCTS #########
############################
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
async def create_product(
    product: Product, current_user: User = Depends(get_current_user)
):
    if not current_user.is_superuser:
        raise HTTPException(status_code=403, detail="Permission denied")

    response = await post_product(product.dict())
    if response:
        return response
    raise HTTPException(
        status_code=400, detail="Product not created, something went wrong :("
    )


@app.put("/api/products/{product_id}", response_model=Product)
async def update_product(
    product_id: str,
    product: ProductUpdate,
    current_user: User = Depends(get_current_user),
):
    if not current_user.is_superuser:
        raise HTTPException(status_code=403, detail="Permission denied")

    response = await put_product(product_id, product.dict(exclude_unset=True))
    if response:
        return response
    raise HTTPException(status_code=404, detail=f"Product: {product_id} not found")


@app.delete("/api/products/{product_id}")
async def remove_product(
    product_id: str, current_user: User = Depends(get_current_user)
):
    if not current_user.is_superuser:
        raise HTTPException(status_code=403, detail="Permission denied")

    response = await delete_product(product_id)
    if response:
        return response
    raise HTTPException(status_code=404, detail=f"Product: {product_id} not found")


##########################
######### STRIPE #########
##########################
@app.post("/api/create-payment-intent")
async def create_payment_intent(cart: List[CartItem]):
    stripe.api_key = settings["STRIPE_SECRET_KEY"]

    print("Received cart data:", cart)
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


@app.get("/api/get-payment-intent/{payment_intent_id}")
async def get_payment_intent(payment_intent_id: str) -> JSONResponse:
    try:
        payment_intent = stripe.PaymentIntent.retrieve(payment_intent_id)
        return JSONResponse({"payment_intent": payment_intent})
    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=400)


@app.post("/api/stripe_webhook")
async def stripe_webhook(
    request: Request, event: stripe.Event = Depends(verify_signature)
):
    print("Request headers:", request.headers)

    if event["type"] == "payment_intent.succeeded":
        payment_intent = event["data"]["object"]
        print("PaymentIntent was successful!")
        return {"status": "success", "payment_intent": payment_intent}
    else:
        print("Unhandled event type {}".format(event["type"]))
        return {"status": "unhandled_event_type"}
