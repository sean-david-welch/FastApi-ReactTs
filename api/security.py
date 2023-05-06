from fastapi import Depends, Cookie, HTTPException, status, Request
from fastapi.security import OAuth2PasswordBearer
from datetime import datetime, timedelta
from typing import Optional
from jose import jwt, JWTError
from passlib.context import CryptContext
from config import settings

from models import UserDB, TokenData
from database import get_user

SECRET_KEY = settings["SECRET_KEY"]
ALGORITHM = settings["ALGORITHM"]
ACCESS_TOKEN_EXPIRE_MINUTES = 30

password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/login")


def verify_password(user_password, hashed_password):
    return password_context.verify(user_password, hashed_password)


def get_password_hash(password):
    return password_context.hash(password)


async def authenticate_user(username: str, password: str) -> Optional[UserDB]:
    user = await get_user(username)
    if user and verify_password(password, user.hashed_password):
        return user
    return None


def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expires = datetime.utcnow() + expires_delta
    else:
        expires = datetime.utcnow() + timedelta(minutes=15)

    to_encode.update({"exp": expires})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def cookie_oauth2_scheme(request: Request):
    token = request.cookies.get("access_token")
    if token is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not find access token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return token


async def get_current_user(token: str = Depends(cookie_oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception

    user = await get_user(token_data.username)
    if user is None:
        raise credentials_exception

    return user
