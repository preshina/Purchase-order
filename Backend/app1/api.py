from fastapi.middleware.cors import CORSMiddleware
from Backend.app1.schema.purchase import PurchaseOrderCreate, PurchaseResponse, PurchaseOrderItemUpdate, PurchaseOrderUpdate, PurchaseOrderDetailResponse
from Backend.app1.service import PurchaseService
from fastapi import FastAPI, Depends, HTTPException
# from fastapi import HTTPException
from sqlalchemy.orm import Session
from Backend.app1.database import get_db
from Backend.app1.adapter.orm import PurchaseOrder, PurchaseOrderItem


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_service(db: Session = Depends(get_db)):
    return PurchaseService(db)


@app.get("/debug/items")
def debug_items(db: Session = Depends(get_db)):
    return db.query(PurchaseOrderItem).all()


@app.get("/debug/orders")
def debug_orders(db: Session = Depends(get_db)):
    return db.query(PurchaseOrder).all()


# api.py


@app.post("/orders")
def create_order(data: PurchaseOrderCreate, service: PurchaseService = Depends(get_service)):
    return service.create_purchase_order_with_items(data)


# @app.get("/orders")
# def get_order(service: PurchaseService = Depends(get_service)):
#     return service.get_order()

@app.get("/orders")
def get_order(order_number: str | None = None, status: str | None = None, service: PurchaseService = Depends(get_service)):
    return service.get_order(order_number, status)


@app.get("/orders/{order_id}")
def get_order_by_id(order_id: int, service: PurchaseService = Depends(get_service)):
    return service.get_order_by_id(order_id)


@app.get("/order-items/{order_id}", response_model=PurchaseOrderDetailResponse)
def get_order_by_id(order_id: int, service: PurchaseService = Depends(get_service)):
    return service.get_purchase_order_detail(order_id)
# @app.put("/orders/{item_id}")
# def update_order_item(
#     item_id: int,
#     data: PurchaseOrderItemUpdate,
#     service: PurchaseService = Depends(get_service)
# ):
#     return service.update_order(item_id, data)


@app.put("/order-items/{order_id}")
def update_order(
    order_id: int,
    data: PurchaseOrderUpdate,
    service: PurchaseService = Depends(get_service)
):
    return service.update_order(order_id, data)


@app.delete("/orders/{order_id}")
def delete_order(
    order_id: int,
    service: PurchaseService = Depends(get_service)
):
    success = service.delete_order(order_id)

    if not success:
        raise HTTPException(
            status_code=404,
            detail="Order not found"
        )

    return {"message": "Deleted successfully"}
