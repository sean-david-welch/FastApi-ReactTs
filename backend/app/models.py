from pydantic import BaseModel, Field, root_validator
import uuid

class Product(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()), example="null" )
    name: str = Field(default="Product")
    description: str = Field(default="Product description")
    price: float = Field(default=1.0)
    image: str = Field(default="https://via.placeholder.com/150")

    @root_validator(pre=True)
    def set_id(cls, values):
        values["id"] = str(uuid.uuid4())
        return values

    def __init__(self, **data):
        if 'id' not in data:
            data['id'] = str(uuid.uuid4())
        super().__init__(**data)

class ProductUpdate(BaseModel):
    name: str = Field(default="Product")
    description: str = Field(default="Product description")
    price: float = Field(default=1.0)
    image: str = Field(default="https://via.placeholder.com/150")