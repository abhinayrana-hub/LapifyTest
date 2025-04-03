import { useApp } from "../context/AppContext";

export default function OrderHistory() {
  const { orders } = useApp();

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Order History</h2>
      {orders.length === 0 ? (
        <p>No past orders.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="border p-4 rounded mb-4">
            <p>
              <b>Date:</b> {order.date}
            </p>
            <p>
              <b>Address:</b> {order.address}
            </p>
            <p>
              <b>Total:</b> ₹{order.total}
            </p>
            <div className="mt-2">
              <p className="font-semibold">Items Ordered:</p>
              <ul className="list-disc pl-6">
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    {item.name} × {item.qty} = ₹{item.price * item.qty}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
