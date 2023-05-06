from pydantic import BaseModel, Field
from typing import Optional


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


class CartItem(BaseModel):
    price: float
    quantity: int


class User(BaseModel):
    username: str
    email: Optional[str] = None
    full_name: Optional[str] = None
    disabled: Optional[bool] = None


class UserCreate(BaseModel):
    username: str
    email: Optional[str] = None
    full_name: Optional[str] = None
    password: str


class UserDB(User):
    hashed_password: str


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: Optional[str] = None