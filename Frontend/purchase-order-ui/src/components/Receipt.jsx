function Receipt({order}) {

  const printReceipt = () => {
    window.print();
  };


  const subtotal =
    order.grand_total -
    order.vat_amount;


  return (
    <div>

      <h1>Purchase Receipt</h1>

      <p>
        Order: {order.order_number}
      </p>


      <table>

        {order.items.map(item => (
          <tr key={item.id}>
            <td>{item.item}</td>
            <td>{item.quantity}</td>
            <td>
              {item.unit_price}
            </td>
            <td>
              {item.total}
            </td>
          </tr>
        ))}

      </table>


      <div>

        <p>
          Subtotal:
          ₹ {subtotal}
        </p>

        <p>
          Discount:
          ₹ {order.discount_amount}
        </p>

        <p>
          VAT:
          ₹ {order.vat_amount}
        </p>


        <h2>
          Total:
          ₹ {order.grand_total}
        </h2>

      </div>


      <button onClick={printReceipt}>
        Print
      </button>

    </div>
  );
}