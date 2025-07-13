// frontend/src/pages/Login.jsx
import { useState } from "react";
import { useAuthRedirect } from "../hooks/useAuthRedirect";

export default function Login() {
  useAuthRedirect({ protectedRoute: false });
  const [shop, setShop] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!shop.endsWith(".myshopify.com")) {
      alert("Enter a valid Shopify domain");
      return;
    }
    window.location.href = `/auth?shop=${shop}`;
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-full max-w-sm">
        <h2 className="text-xl mb-4 font-semibold">Login to your shop</h2>
        <input
          type="text"
          value={shop}
          onChange={(e) => setShop(e.target.value)}
          placeholder="your-shop.myshopify.com"
          className="border p-2 w-full mb-4 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}
