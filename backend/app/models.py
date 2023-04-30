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


class TokenData(BaseModel):
    sub: str
    permissions: list


class User(BaseModel):
    username: str
    password: str
    email: str
    full_name: str
    disabled: bool = None
    hashed_password: str = None
