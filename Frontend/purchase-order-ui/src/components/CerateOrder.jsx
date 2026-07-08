import { useState } from "react";

function CreateOrder({ order, onClose }) {
  const [orderNumber, setOrderNumber] = useState(order?.order_number || "");

const [items, setItems] = useState(
  order?.items || [
    {
      item: "",
      description: "",
      quantity: 1,
      unit_price: 0,
    },
  ]
);

  const handleSubmit = async (e) => {
  e.preventDefault();

  const orderData = {
    order_number: orderNumber,
    items: items,
  };

  const url = order
    ? `http://127.0.0.1:8000/order-items/${order.id}`
    : "http://127.0.0.1:8000/orders";

  const method = order ? "PUT" : "POST";

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  });

  const data = await response.json();

  console.log(data);

  alert(order ? "Order Updated!" : "Order Created!");

  onClose();
};

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
  <form
    onSubmit={handleSubmit}
    className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl shadow-xl p-8 space-y-6"
  >
        <div className="flex justify-between items-center">
  <h2 className="text-2xl font-bold">
  {order ? "Edit Purchase Order" : "Create Purchase Order"}
</h2>

  <button
    type="button"
    onClick={onClose}
    className="text-3xl font-bold text-gray-400 hover:text-red-600 transition"
  >
    ×
  </button>
</div>

        <input
          className="w-full border rounded p-2"
          placeholder="Order Number"
          value={orderNumber}
          onChange={(e) => setOrderNumber(e.target.value)}
        />

        {items.map((item, index) => (
  <div key={index} className="border rounded-lg p-4 space-y-3">
    <h3 className="font-semibold">Item {index + 1}</h3>

    <input
      className="w-full border rounded p-2"
      placeholder="Item Name"
      value={item.item}
      onChange={(e) => {
        const newItems = [...items];
        newItems[index].item = e.target.value;
        setItems(newItems);
      }}
    />

    <input
      className="w-full border rounded p-2"
      placeholder="Description"
      value={item.description}
      onChange={(e) => {
        const newItems = [...items];
        newItems[index].description = e.target.value;
        setItems(newItems);
      }}
    />

    <input
      className="w-full border rounded p-2"
      type="number"
      placeholder="Quantity"
      value={item.quantity}
      onChange={(e) => {
        const newItems = [...items];
        newItems[index].quantity = Number(e.target.value);
        setItems(newItems);
      }}
    />

    <input
      className="w-full border rounded p-2"
      type="number"
      placeholder="Unit Price"
      value={item.unit_price}
      onChange={(e) => {
        const newItems = [...items];
        newItems[index].unit_price = Number(e.target.value);
        setItems(newItems);
      }}
    />
  </div>
))}

        <button
  type="button"
  onClick={() =>
    setItems([
      ...items,
      {
        item: "",
        description: "",
        quantity: 1,
        unit_price: 0,
      },
    ])
  }
  className="w-full border-2 border-dashed border-indigo-500 text-indigo-600 py-2 rounded-lg hover:bg-indigo-50"
>
  + Add Item
</button>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
        >
          {order ? "Update Order" : "Save Order"}
        </button>
      </form>
    </div>
  );
}

export default CreateOrder;