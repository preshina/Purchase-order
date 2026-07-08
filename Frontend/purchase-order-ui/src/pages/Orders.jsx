import { useEffect, useState } from "react";
import CreateOrder from "../components/CerateOrder";
import ViewOrder from "../components/ViewOrder";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [editingOrder, setEditingOrder] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/debug/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  async function handleView(orderId) {
    const response = await fetch(
      `http://127.0.0.1:8000/order-items/${orderId}`
    );
   

    const data = await response.json();

    console.log(data);

    setSelectedOrder(data);
  }
   async function handleDelete(orderId) {
  const confirmed = window.confirm(
    "Are you sure you want to delete this order?"
  );

  if (!confirmed) return;

  await fetch(`http://127.0.0.1:8000/orders/${orderId}`, {
    method: "DELETE",
  });

  // Remove the deleted order from the table
  setOrders(orders.filter((order) => order.id !== orderId));
}
async function handleEdit(orderId) {
  const response = await fetch(
    `http://127.0.0.1:8000/order-items/${orderId}`
  );

  const data = await response.json();

  setEditingOrder(data);
}

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl p-8">

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-800">
              Purchase Orders
            </h1>

            <p className="text-slate-500 mt-1">
              Manage all purchase orders
            </p>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="rounded-lg bg-indigo-600 px-5 py-2.5 text-white font-semibold hover:bg-indigo-700"
          >
            Create Order
          </button>
        </div>

        <div className="overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-100">
              <tr className="border-b">
                <th className="text-left px-6 py-4">Order Number</th>
                <th className="text-left px-6 py-4">Status</th>
                <th className="text-right px-6 py-4">Grand Total</th>
                <th className="text-right px-6 py-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-t hover:bg-slate-50 transition"
                >
                  <td className="px-6 py-5 font-semibold">
                    {order.order_number}
                  </td>

                  <td className="px-6 py-5">
                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                      {order.status}
                    </span>
                  </td>

                  <td className="px-6 py-5 text-right font-bold">
                    ₹ {order.grand_total.toLocaleString()}
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex justify-end gap-2">

                      <button
                        onClick={() => handleView(order.id)}
                        className="rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700"
                      >
                        View
                      </button>

                      <button
  onClick={() => handleEdit(order.id)}
  className="rounded bg-yellow-500 px-3 py-1 text-white hover:bg-yellow-600"
>
  Edit
</button>

                      <button
  onClick={() => handleDelete(order.id)}
  className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
>
  Delete
</button>

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

      {selectedOrder && (
        <ViewOrder
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}

      {(showForm || editingOrder) && (
  <CreateOrder
    order={editingOrder}
    onClose={() => {
      setShowForm(false);
      setEditingOrder(null);
    }}
  />
)}

    </div>
  );
}

export default Orders;