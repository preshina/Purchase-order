function Receipt({ order, onClose }) {
  const subtotal = order.grand_total;
  const vat = subtotal * 0.13;
  const total = subtotal + vat;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl p-10">

        <h1 className="text-4xl font-bold text-center mb-10">
          PURCHASE ORDER
        </h1>

        <div className="mb-8">
          <p className="font-bold">My Company Pvt. Ltd.</p>
          <p>Kathmandu, Nepal</p>
          <p>contact@company.com</p>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-10">
          <div>
            <p><b>PO Number:</b> {order.order_number}</p>
            <p><b>Status:</b> {order.status}</p>
          </div>

          <div className="text-right">
            <p>
              <b>Date:</b>{" "}
              {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>

        <table className="w-full border">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="p-4 text-left">Item</th>
              <th className="p-4">Qty</th>
              <th className="p-4">Unit Price</th>
              <th className="p-4">Total</th>
            </tr>
          </thead>

          <tbody>
            {order.items.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="p-4">
                  {item.item}
                  <div className="text-gray-500 text-sm">
                    {item.description}
                  </div>
                </td>

                <td className="text-center">
                  {item.quantity}
                </td>

                <td className="text-center">
                  ₹{item.unit_price.toLocaleString()}
                </td>

                <td className="text-center">
                  ₹{item.total.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-10 flex justify-end">
          <div className="w-80 space-y-3">

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>

            <div className="flex justify-between">
              <span>VAT (13%)</span>
              <span>₹{vat.toLocaleString()}</span>
            </div>

            <hr />

            <div className="flex justify-between text-2xl font-bold text-indigo-700">
              <span>Grand Total</span>
              <span>₹{total.toLocaleString()}</span>
            </div>

          </div>
        </div>

        <div className="mt-24">
          <p>Authorized Signature</p>

          <div className="border-b w-64 mt-10"></div>
        </div>

        <div className="mt-10 flex justify-end">
          <button
            onClick={() => window.print()}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg"
          >
            Print
          </button>
        </div>

      </div>
    </div>
  );
}

export default Receipt;