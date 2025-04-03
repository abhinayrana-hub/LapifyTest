import { useApp } from "../context/AppContext";
import { useState } from "react";

export default function Cart() {
  const { cart, increaseQty, removeFromCart, checkout } = useApp();
  const [form, setForm] = useState({
    address: "",
    state: "",
    country: "",
    phone: "",
    pincode: "",
  });
  const [order, setOrder] = useState(null);

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  const handleCheckout = () => {
    const { address, state, country, phone, pincode } = form;
    if (!address || !state || !country || !phone || !pincode) {
      alert("Please fill all address fields.");
      return;
    }
    const fullAddress = `${address}, ${state}, ${country}, ${pincode}, Phone: ${phone}`;
    const placedOrder = checkout(fullAddress);
    setOrder(placedOrder);
    setForm({ address: "", state: "", country: "", phone: "", pincode: "" });
  };

  const decreaseQty = (id) => {
    const item = cart.find((i) => i.id === id);
    if (item.qty <= 1) removeFromCart(id);
    else increaseQty(id, -1);
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold">Your Cart</h2>
      {order ? (
        <div className="text-green-600">
          <h3 className="text-xl font-bold mb-2">Order Placed!</h3>
          <p>
            <b>Delivery Address:</b> {order.address}
          </p>
          <p>
            <b>Total:</b> ${order.total}
          </p>
        </div>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border p-4 rounded"
            >
              <div>
                <h4 className="font-semibold">{item.name}</h4>
                <p>${item.price}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => decreaseQty(item.id)}
                  className="bg-red-500 text-white px-2 rounded"
                >
                  -
                </button>
                <span className="font-bold">{item.qty}</span>
                <button
                  onClick={() => increaseQty(item.id)}
                  className="bg-blue-500 text-white px-2 rounded"
                >
                  +
                </button>
              </div>
            </div>
          ))}

          <h3 className="font-bold mt-4">Total: ${total}</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
            <input
              className="border p-2"
              placeholder="Address"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
            <input
              className="border p-2"
              placeholder="State"
              value={form.state}
              onChange={(e) => setForm({ ...form, state: e.target.value })}
            />
            <input
              className="border p-2"
              placeholder="Country"
              value={form.country}
              onChange={(e) => setForm({ ...form, country: e.target.value })}
            />
            <input
              className="border p-2"
              placeholder="Pincode"
              value={form.pincode}
              onChange={(e) => setForm({ ...form, pincode: e.target.value })}
            />
            <input
              className="border p-2 col-span-full"
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>

          <button
            onClick={handleCheckout}
            className="bg-green-600 text-white px-4 py-2 mt-4 rounded"
          >
            Checkout
          </button>
        </>
      )}
    </div>
  );
}
