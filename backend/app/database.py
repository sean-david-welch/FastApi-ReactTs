import os
import motor.motor_asyncio
from dotenv import load_dotenv

from models import Product 

load_dotenv()
client = motor.motor_asyncio.AsyncIOMotorClient(os.environ.get("RAILWAY_MONGO_URI"))
database = client.ProductsList
collection = database.products

async def fetch_product(id: str):
    document = await collection.find_one({"id": id})
    return document

async def fetch_all_products():
    products = []
    cursor = collection.find({})
    async for document in cursor:
        products.append(Product(**document))
    return products

async def post_product(product: dict):
    document = product
    result = await collection.insert_one(document)
    return document

async def put_product(product_id: str, product: dict):
    result = await collection.update_one({"id": product_id}, {"$set": product})
    if result.modified_count > 0:
        document = await collection.find_one({"id": product_id})
        return document
    return None

async def delete_product(id: str):
    await collection.delete_one({"id": id})
    return True
