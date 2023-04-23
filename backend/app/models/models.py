from pydantic import BaseModel
import uuid

class Product(BaseModel):
    id: str
    name: str
    description: str
    price: int
    image: str