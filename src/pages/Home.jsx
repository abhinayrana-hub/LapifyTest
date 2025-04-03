import { useApp } from "../context/AppContext";
import laptop1 from "../assets/1.jpeg";
import laptop2 from "../assets/2.jpg";
import laptop3 from "../assets/3.jpeg";
import laptop4 from "../assets/4.jpeg";
import laptop5 from "../assets/5.jpg";
import laptop6 from "../assets/6.jpg";

const laptops = [
  {
    id: 1,
    name: "MacBook Pro 16” M2",
    price: 249900,
    image: laptop1,
  },
  {
    id: 2,
    name: "Dell XPS 13 Plus",
    price: 34990,
    image: laptop2,
  },
  {
    id: 3,
    name: "HP Spectre x360",
    price: 22299,
    image: laptop3,
  },
  {
    id: 4,
    name: "Lenovo ThinkPad X1 Carbon",
    price: 159900,
    image: laptop4,
  },
  {
    id: 5,
    name: "ASUS ROG Zephyrus G14",
    price: 179900,
    image: laptop4,
  },
  {
    id: 6,
    name: "Acer Swift X",
    price: 29900,
    image: laptop1,
  },
  {
    id: 7,
    name: "Razer Blade 15",
    price: 54000,
    image: laptop2,
  },
  {
    id: 8,
    name: "MSI Creator Z16",
    price: 23990,
    image: laptop6,
  },
  {
    id: 9,
    name: "LG Gram 17",
    price: 16990,
    image: laptop1,
  },
  {
    id: 10,
    name: "Samsung Galaxy Book3",
    price: 129900,
    image: laptop3,
  },
  {
    id: 11,
    name: "Microsoft Surface Laptop 5",
    price: 149900,
    image: laptop4,
  },
  {
    id: 12,
    name: "HP Envy 13",
    price: 48000,
    image: laptop6,
  },
  {
    id: 13,
    name: "Acer Nitro 5",
    price: 56000,
    image: laptop6,
  },
  {
    id: 14,
    name: "ASUS ZenBook 14",
    price: 119900,
    image: laptop1,
  },
  {
    id: 15,
    name: "Dell Inspiron 15",
    price: 79900,
    image: laptop2,
  },
  {
    id: 16,
    name: "MSI Modern 14",
    price: 84900,
    image: laptop6,
  },
  {
    id: 17,
    name: "ASUS TUF Dash F15",
    price: 36000,
    image: laptop3,
  },
  {
    id: 18,
    name: "Lenovo Legion 5",
    price: 149900,
    image: laptop4,
  },
  {
    id: 19,
    name: "HP Pavilion 15",
    price: 69900,
    image: laptop5,
  },
  {
    id: 20,
    name: "Chuwi GemiBook Pro",
    price: 49900,
    image: laptop2,
  },
];

export default function Home() {
  const { addToCart } = useApp();

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {laptops.map((item) => (
        <div
          key={item.id}
          className="border p-4 rounded shadow hover:shadow-lg"
        >
          <img
            src={item.image}
            alt={item.name}
            className="h-48 w-full object-contain mb-2"
          />
          <h2 className="text-lg font-bold">{item.name}</h2>
          <p className="text-gray-700 mb-2">Price: ₹{item.price}</p>
          <button
            onClick={() => addToCart(item)}
            className="bg-blue-600 text-white px-4 py-2 rounded w-full"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
