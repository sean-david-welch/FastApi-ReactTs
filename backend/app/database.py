from models import Product 
import os
import motor.motor_asyncio

client = motor.motor_asyncio.AsyncIOMotorClient(os.environ.get("MONGO_URI"))
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

async def create_product(product: dict):
    document = product
    result = await collection.insert_one(document)
    return document

async def update_product(title: str, desc: str):
    await collection.update_one({"title": title}, {"$set": {"description": desc}})
    document = await collection.find_one({"title": title})
    return document

async def delete_product(id: str):
    await collection.delete_one({"id": id})
    return True
