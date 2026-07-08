# purchase.py
from enum import Enum
from pydantic import BaseModel
from typing import List


class PurchaseOrderStatus(str, Enum):
    pending = "pending"
    completed = "completed"
    cancelled = "cancelled"


class PurchaseItemCreate(BaseModel):
    item: str
    description: str
    quantity: int
    unit_price: float


class PurchaseOrderCreate(BaseModel):
    order_number: str
    items: List[PurchaseItemCreate]


class PurchaseOrderUpdate(BaseModel):
    order_number: str
    items: list[PurchaseOrderItemUpdate]


class PurchaseResponse(BaseModel):
    id: int
    item: str
    description: str
    quantity: int
    unit_price: float
    total: float
    purchase_order_id: int

    class Config:
        from_attributes = True


class PurchaseOrderItemUpdate(BaseModel):
    id: int
    item: str
    description: str | None = None
    quantity: int
    unit_price: float


class PurchaseOrderResponse(BaseModel):
    id: int
    order_number: str
    status: str

    class Config:
        from_attributes = True


class PurchaseOrderDetailResponse(BaseModel):
    id: int
    order_number: str
    status: str
    discount_amount: float
    vat_amount: float
    grand_total: float

    items: list[PurchaseResponse]

    class Config:
        from_attributes = True
