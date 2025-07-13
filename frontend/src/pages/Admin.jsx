// frontend/src/pages/Admin.jsx
import { useAuthRedirect } from "../hooks/useAuthRedirect";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Admin() {
  useAuthRedirect({ protectedRoute: true });

  const [shop, setShop] = useState("");

  useEffect(() => {
    axios.get("/api/whoami").then((res) => setShop(res.data.shop));
  }, []);

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-bold">Welcome, {shop}</h1>
      <button
        onClick={() => (window.location.href = "/logout")}
        className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
}
