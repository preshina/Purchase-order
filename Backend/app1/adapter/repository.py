# repository.py
from sqlalchemy import select
from Backend.app1.adapter.orm import PurchaseOrder, PurchaseOrderItem
from fastapi import HTTPException


class PurchaseRepo:
    def __init__(self, session):
        self.session = session

    def create_items(self, items, order_id):
        objs = [
            PurchaseOrderItem(
                item=i.item,
                description=i.description,
                quantity=i.quantity,
                unit_price=i.unit_price,

                purchase_order_id=order_id
            )
            for i in items
        ]

        self.session.add_all(objs)
        self.session.commit()
        for o in objs:
            self.session.refresh(o)

        return objs

    def get_order(self, order_number=None, status=None):
        result = select(PurchaseOrder)
        if order_number:
            result = result.where(
                PurchaseOrder.order_number == order_number)
        if status:
            result = result.where(PurchaseOrder.status == status)
        return self.session.scalars(result).all()

    def get_order_by_id(self, id):
        # so, we used get because self.session.get(PurchaseOrder,id=primary_key), the id is the primary key so we used `get`
        return self.session.get(PurchaseOrder, id)
        # otherwise we have to use select(PurchaseOrder).where(PurchaseOrder.order_number==order_number),because order_number is not a primary key.

    def update_order_item(self, id, data):
        result = self.session.get(PurchaseOrderItem, id)

        if result is None:
            return None

        result.item = data.item
        result.description = data.description
        result.quantity = data.quantity
        result.unit_price = data.unit_price

        self.session.commit()
        self.session.refresh(result)

        return result

    def delete_order(self, order_id: int):
        order = self.session.get(PurchaseOrder, order_id)

        if not order:
            return False

        self.session.delete(order)
        self.session.commit()

        return True

    def update_order(self, order_id, data, grand_total, vat_amount, discount_amount):
        order = self.session.get(PurchaseOrder, order_id)

        if not order:
            return None

        order.order_number = data.order_number

        for item_data in data.items:
            db_item = self.session.get(PurchaseOrderItem, item_data.id)

            if db_item is None:
                raise Exception(f"Item {item_data.id} not found")

            if db_item.purchase_order_id != order.id:
                raise HTTPException(
                    status_code=400,
                    detail=f"Item {db_item.id} does not belong to Order {order.id}"
                )

            db_item.item = item_data.item
            db_item.description = item_data.description
            db_item.quantity = item_data.quantity
            db_item.unit_price = item_data.unit_price

        order.grand_total = grand_total
        order.vat_amount = vat_amount
        order.discount_amount = discount_amount

        self.session.commit()
        self.session.refresh(order)

        return order

        return order

    def get_purchase_order_detail(self, order_id):
        result = self.session.get(PurchaseOrder, order_id)
        return result
