from fastapi import FastAPI, HTTPException 
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse

from models import Product
from database import (fetch_all_products, fetch_product, post_product, put_product, delete_product)

app = FastAPI()
origins = ['http://localhost:3000', 'http://localhost:8000']

app.add_middleware(CORSMiddleware, allow_origins=origins, allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

@app.get("/")
def root():
    return RedirectResponse(url="/docs")

@app.get("/api/products")
async def get_products():
    response = await fetch_all_products()
    return response

@app.get("/api/products/{product_id}", response_model=Product)
async def get_product(product_id: str):
    response = await fetch_product(product_id)
    if response:
        return response
    raise HTTPException(status_code=404, detail=f"Product: {product_id} not found")

@app.post("/api/products", response_model=Product)
async def create_product(product: Product):
    response = await post_product(product.dict())
    if response:
        return response
    raise HTTPException(status_code=400, detail="Product not created, something went wrong :(")

@app.put("/api/products/{product_id}", response_model=Product)
async def update_product(product_id: str):
    response = await put_product(product_id)
    if response:
        return response
    raise HTTPException(status_code=404, detail=f"Product: {product_id} not found")

@app.delete("/api/products/{product_id}")
async def remove_product(product_id: str):
    response = await delete_product(product_id)
    if response:
        return response
    raise HTTPException(status_code=404, detail=f"Product: {product_id} not found")
