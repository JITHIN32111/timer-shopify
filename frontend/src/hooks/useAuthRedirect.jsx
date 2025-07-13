// frontend/src/hooks/useAuthRedirect.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const useAuthRedirect = ({ protectedRoute = false }) => {
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/api/whoami")
      .then((res) => {
        if (protectedRoute && res.status !== 200) {
          navigate("/login");
        } else if (!protectedRoute && res.status === 200) {
          navigate("/admin");
        }
      })
      .catch(() => {
        if (protectedRoute) navigate("/login");
      });
  }, []);
};
