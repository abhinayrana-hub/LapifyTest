import { useState } from "react";
import { useApp } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

export default function LoginRegister() {
  const { login, register, users } = useApp();
  const [form, setForm] = useState({ email: "", password: "" });
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      const success = login(form.email, form.password);
      if (success) {
        navigate("/");
      } else {
        alert("User not found. Redirecting to register...");
        setIsLogin(false);
        setForm({ email: "", password: "" }); // clear fields
      }
    } else {
      const userExists = users.some((u) => u.email === form.email);
      if (userExists) {
        alert("User already exists.");
        return;
      }
      register(form);
      alert("Registration successful!");
      navigate("/");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto space-y-4">
      <h2 className="text-2xl font-bold text-center mb-2">
        {isLogin ? "Login for Existing User" : "Register for New User"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          required
          className="border p-2 w-full"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          required
          className="border p-2 w-full"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 w-full rounded"
        >
          Submit
        </button>
      </form>

      <p className="text-center">
        {isLogin ? "New user?" : "Already have an account?"}{" "}
        <button
          type="button"
          onClick={() => {
            setIsLogin(!isLogin);
            setForm({ email: "", password: "" });
          }}
          className="text-blue-600 underline"
        >
          {isLogin ? "Register here" : "Login here"}
        </button>
      </p>
    </div>
  );
}
