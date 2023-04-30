from dotenv import load_dotenv

load_dotenv()
import os

settings = {
    "MONGO_URI": os.getenv("RAILWAY_MONGO_URI"),
    "STRIPE_SECRET_KEY": os.getenv("STRIPE_SECRET_KEY"),
    "STRIPE_WEBHOOK_ENDPOINT_SECRET": os.getenv("STRIPE_WEBHOOK_ENDPOINT_SECRET"),
}
