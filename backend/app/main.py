from fastapi import FastAPI, HTTPException 
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse

app = FastAPI()
origins = ['http://localhost:3000', 'http://localhost:8000']

app.add_middleware(CORSMiddleware, allow_origins=origins, allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

@app.get("/")
def root():
    return RedirectResponse(url="/docs")

@app.get("/api/products")
async def get_products():
    pass

@app.get("/api/products/{product_id}")
async def get_product(product_id: str):
    pass

@app.post("/api/products")
async def create_product():
    pass

@app.put("/api/products/{product_id}")
async def update_product(product_id: str, product: dict):
    pass

@app.delete("/api/products/{product_id}")
async def delete_product(product_id: str, product: dict):
    pass
