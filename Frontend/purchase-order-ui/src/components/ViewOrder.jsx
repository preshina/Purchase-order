
function ViewOrder({ order, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="w-full max-w-5xl rounded-2xl bg-white shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-8 py-6 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold">
              Purchase Order
            </h2>

            <p className="text-indigo-100 mt-1 text-lg">
              {order.order_number}
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-3xl hover:text-red-300 transition"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-8">

          <div className="flex justify-between items-center mb-8">

            <div>
              <p className="text-gray-500 text-sm">
                Status
              </p>

              <span className="inline-block mt-2 rounded-full bg-yellow-100 px-4 py-2 text-yellow-700 font-semibold">
                {order.status}
              </span>
            </div>

            <div className="text-right">
              <p className="text-gray-500 text-sm">
                Grand Total
              </p>

              <h2 className="text-4xl font-bold text-green-600 mt-2">
                ₹ {order.grand_total.toLocaleString()}
              </h2>
            </div>

          </div>

          <div className="rounded-xl border overflow-hidden">

            <table className="w-full">

              <thead className="bg-slate-100">
                <tr>
                  <th className="text-left p-4">Item</th>
                  <th className="text-left p-4">Description</th>
                  <th className="text-center p-4">Qty</th>
                  <th className="text-right p-4">Unit Price</th>
                  <th className="text-right p-4">Total</th>
                </tr>
              </thead>

              <tbody>

                {order.items.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t hover:bg-indigo-50 transition"
                  >
                    <td className="p-4 font-semibold">
                      {item.item}
                    </td>

                    <td className="p-4 text-gray-600">
                      {item.description}
                    </td>

                    <td className="p-4 text-center">
                      {item.quantity}
                    </td>

                    <td className="p-4 text-right">
                      ₹ {item.unit_price.toLocaleString()}
                    </td>

                    <td className="p-4 text-right font-bold text-green-600">
                      ₹ {item.total.toLocaleString()}
                    </td>
                  </tr>
                ))}

              </tbody>

            </table>

          </div>
                <div className="mt-6 ml-auto w-80 space-y-2 text-right">
  <div>
    Subtotal: ₹{" "}
    {(order.grand_total + order.discount_amount - order.vat_amount)
      .toLocaleString()}
  </div>
  <div>
    Discount: ₹ {order.discount_amount.toLocaleString()}
  </div>
  <div>
    VAT (13%): ₹ {order.vat_amount.toLocaleString()}
  </div>
  <div className="border-t pt-2 font-bold text-xl">
    Grand Total: ₹ {order.grand_total.toLocaleString()}
  </div>
</div>
          <div className="mt-8 flex justify-end gap-3">
  <button
    onClick={() => window.print()}
    className="rounded-xl bg-green-600 px-6 py-3 text-white font-semibold hover:bg-green-700 transition"
  >
    Print Receipt
  </button>
          
            <button
              onClick={onClose}
              className="rounded-xl bg-indigo-600 px-6 py-3 text-white font-semibold hover:bg-indigo-700 transition"
            >
              Close
            </button>
        
          </div>

        </div>

      </div>
    </div>
  );
}

export default ViewOrder;