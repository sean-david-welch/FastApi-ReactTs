from dotenv import load_dotenv

load_dotenv()
import os

settings = {
    "MONGO_URI": os.getenv("RAILWAY_MONGO_URI"),
    "STRIPE_SECRET_KEY": os.getenv("STRIPE_SECRET_KEY"),
    "STRIPE_WEBHOOK_ENDPOINT_SECRET": os.getenv("STRIPE_WEBHOOK_ENDPOINT_SECRET"),
    "OAUTH2_DOMAIN": os.getenv("OAUTH2_DOMAIN"),
    "OAUTH2_CLIENT_ID": os.getenv("OAUTH2_CLIENT_ID"),
    "OAUTH2_CLIENT_SECRET": os.getenv("OAUTH2_CLIENT_SECRET"),
    "SECRET_KEY": os.getenv("SECRET_KEY"),
    "ALGORITHM": os.getenv("ALGORITHM"),
}
