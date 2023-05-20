import uuid
import motor.motor_asyncio

from models import Product, UserDB, User, StaticContent, AboutContent
from config import settings

client = motor.motor_asyncio.AsyncIOMotorClient(settings["MONGO_URI"])
database = client.PrimalFormulas
products_collection = database.Products
users_collection = database.Users
content_collection = database.Content
about_collection = database.About


#### Content CRUD ####
async def create_content_db(content: dict):
    content_data = content.dict()
    result = await content_collection.insert_one(content_data)
    return result.inserted_id


async def get_content_db(name: str) -> StaticContent:
    content_data = await content_collection.find_one({"name": name})
    if content_data:
        return StaticContent(**content_data)


#### About CRUD ####
async def create_about_db(about: dict):
    about_data = about.dict()
    about_data["id"] = str(uuid.uuid4())
    about_data["id"] = str(about_data["id"])
    result = await about_collection.insert_one(about_data)
    return result.inserted_id


async def fetch_all_about():
    about = []
    cursor = about_collection.find({})
    async for document in cursor:
        about.append(AboutContent(**document))
    return about


async def get_about_db(id: str) -> AboutContent:
    about_data = await about_collection.find_one({"id": id})
    if about_data:
        return AboutContent(**about_data)


#### User CRUD ####
async def create_user(user: UserDB):
    user_data = user.dict()
    user_data["id"] = str(user_data["id"])
    result = await users_collection.insert_one(user_data)
    return result.inserted_id


async def get_user(username: str) -> User:
    user_data = await users_collection.find_one(
        {"username": username}
    ) or await users_collection.find_one({"email": username})
    if user_data:
        return UserDB(**user_data)


async def get_user_by_id(user_id: str) -> User:
    user_data = await users_collection.find_one({"id": user_id})
    if user_data:
        return UserDB(**user_data)


async def update_user(user_id: str, user_data: dict):
    await users_collection.update_one({"id": user_id}, {"$set": user_data})


async def delete_user(user_id: str):
    await users_collection.delete_one({"id": user_id})


#### Product CRUD ####
async def fetch_all_products():
    products = []
    cursor = products_collection.find({})
    async for document in cursor:
        products.append(Product(**document))
    return products


async def fetch_product(id: str):
    document = await products_collection.find_one({"id": id})
    return document


async def post_product(product: dict):
    product["id"] = str(uuid.uuid4())
    document = product
    result = await products_collection.insert_one(document)
    document["_id"] = result.inserted_id
    return document


async def put_product(product_id: str, product: dict):
    result = await products_collection.update_one({"id": product_id}, {"$set": product})
    if result.modified_count > 0:
        document = await products_collection.find_one({"id": product_id})
        return document
    return None


async def delete_product(id: str):
    await products_collection.delete_one({"id": id})
    return True
