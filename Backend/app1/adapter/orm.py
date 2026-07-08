from sqlalchemy import String, Integer, Float, ForeignKey, Numeric
from sqlalchemy.orm import Mapped, mapped_column, DeclarativeBase, relationship


class Base(DeclarativeBase):
    pass


class PurchaseOrder(Base):
    __tablename__ = "purchase_order"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    order_number: Mapped[str] = mapped_column(
        String(20), nullable=False, unique=True)
    status: Mapped[str] = mapped_column(String(20), default="pending")
    discount_amount: Mapped[float] = mapped_column(Numeric(12, 2), default=0)
    vat_amount: Mapped[float] = mapped_column(Numeric(12, 2), default=0)
    grand_total: Mapped[float] = mapped_column(
        Numeric(12, 2), nullable=False, default=0)

    items = relationship(
        "PurchaseOrderItem",
        back_populates="purchase_order",
        cascade="all, delete-orphan"
    )


class PurchaseOrderItem(Base):
    __tablename__ = "purchase_order_item"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)

    item: Mapped[str] = mapped_column(String(30), nullable=False)
    description: Mapped[str] = mapped_column(String(50), nullable=True)
    quantity: Mapped[int] = mapped_column(Integer, nullable=False)
    unit_price: Mapped[float] = mapped_column(Float, nullable=False)

    purchase_order_id: Mapped[int] = mapped_column(
        ForeignKey("purchase_order.id"),
        nullable=False
    )

    purchase_order = relationship(
        "PurchaseOrder",
        back_populates="items"
    )

    @property
    def total(self):
        return self.quantity * self.unit_price
