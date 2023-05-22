from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List
from uuid import uuid4


##### Static Content #####
class StaticContent(BaseModel):
    name: str
    content: str = Field(default="http://localhost:8000/images/default.jpg")


##### About Content #####
class AboutContent(BaseModel):
    id: Optional[str] = Field(default_factory=uuid4, example="null")
    title: str
    description: str
    image: str = Field(default="http://localhost:8000/images/default.jpg")


##### Products #####
class Product(BaseModel):
    id: Optional[str] = Field(default=None, example="null")
    name: str = Field(default="Product")
    description: str = Field(default="Product description")
    price: float = Field(default=1.0)
    image: str = Field(default="http://localhost:8000/images/default.jpg")


class ProductUpdate(BaseModel):
    name: str = Field(default="Product")
    description: str = Field(default="Product description")
    price: float = Field(default=1.0)
    image: str = Field(default="http://localhost:8000/images/default.jpg")


##### Stripe #####
class Address(BaseModel):
    line1: str = Field(default="O'Connell Street")
    line2: str = None
    city: str = Field(default="Dublin")
    state: str = Field(default="Dublin")
    postal_code: str = Field(default="D01 F5P2")
    country: str = Field(default="Ireland")


class Customer(BaseModel):
    name: str = Field(default="John Doe")
    address: Address = Address()


class CartItem(BaseModel):
    price: float = Field(default=1.0)
    quantity: int = Field(default=1)


class PaymentIntentData(BaseModel):
    cart: List[CartItem]
    customer: Customer = Customer()
    receipt_email: Optional[EmailStr] or str = Field(default="guest@primalformulas.ie")


class CheckoutSession(BaseModel):
    id: str


class CheckoutSessionInput(BaseModel):
    quantity: int = Field(default=1)


##### Users #####
class User(BaseModel):
    id: Optional[str] = Field(default_factory=uuid4, example="null")
    username: str
    email: Optional[str] = None
    full_name: Optional[str] = None
    disabled: Optional[bool] = None
    is_superuser: Optional[bool] = False


class UserCreate(BaseModel):
    username: str
    email: Optional[str] = None
    full_name: Optional[str] = None
    password: str
    is_superuser: Optional[bool] = False


class UserDB(User):
    hashed_password: str


class UserEdit(BaseModel):
    username: Optional[str] = None
    password: Optional[str] = None
    email: Optional[str] = None


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: Optional[str] = None
