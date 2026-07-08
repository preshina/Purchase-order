# service.py
from Backend.app1.adapter.repository import PurchaseRepo
from Backend.app1.adapter.orm import PurchaseOrder


class PurchaseService:
    def __init__(self, db):
        self.repo = PurchaseRepo(db)
        self.session = db

    def create_purchase_order_with_items(self, data):
        vat_rate = 0.13

        total_with_vat = 0

        for i in data.items:
            total_with_vat += i.quantity * i.unit_price

        # Extract VAT from the entered price
        amount_before_vat = total_with_vat / (1 + vat_rate)

        discount_amount = 0

        amount_after_discount = amount_before_vat - discount_amount

        vat_amount = total_with_vat - amount_before_vat

        # Customer pays exactly what was entered
        grand_total = total_with_vat

        order = PurchaseOrder(
            order_number=data.order_number,
            grand_total=grand_total,
            vat_amount=vat_amount,
            discount_amount=discount_amount
        )

        self.session.add(order)
        self.session.commit()
        self.session.refresh(order)

        items = self.repo.create_items(data.items, order.id)

        return {
            "order_id": order.id,
            "order_number": order.order_number,
            "grand_total": grand_total,
            "vat_amount": vat_amount,
            "discount_amount": discount_amount,
            "subtotal": amount_after_discount,
            "items": [
                {
                    "id": i.id,
                    "item": i.item,
                    "description": i.description,
                    "quantity": i.quantity,
                    "unit_price": i.unit_price,
                    "total": i.quantity * i.unit_price
                }
                for i in items
            ]
        }

    def get_order(self, order_number=None, status=None):
        return self.repo.get_order(order_number, status)

    def get_order_by_id(self, id):
        return self.repo.get_order_by_id(id)

    def delete_order(self, order_id):
        return self.repo.delete_order(order_id)

    def update_order(self, id, data):
        vat_rate = 0.13

        total_with_vat = 0

        for item in data.items:
            total_with_vat += item.quantity * item.unit_price

        amount_before_vat = total_with_vat / (1 + vat_rate)

        discount_amount = 0

        amount_after_discount = amount_before_vat - discount_amount

        vat_amount = total_with_vat - amount_before_vat

        # Customer still pays the entered amount
        grand_total = total_with_vat

        return self.repo.update_order(
            id,
            data,
            grand_total,
            vat_amount,
            discount_amount
        )

    def get_purchase_order_detail(self, id):

        return self.repo.get_purchase_order_detail(id)
