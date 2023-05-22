from dotenv import load_dotenv

load_dotenv()
import os

settings = {
    "SECRET_KEY": os.getenv("SECRET_KEY"),
    "ALGORITHM": os.getenv("ALGORITHM"),
    "MONGO_URI": os.getenv("MONGO_URI"),
    "STRIPE_SECRET_KEY": os.getenv("STRIPE_SECRET_KEY"),
    "STRIPE_WEBHOOK_ENDPOINT_SECRET": os.getenv("STRIPE_WEBHOOK_ENDPOINT_SECRET"),
    "ACCESS_TOKEN_EXPIRE_MINUTES": os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"),
}
