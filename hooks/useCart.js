import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import api from "@/lib/api";

export const useCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const token = Cookies.get("token");
      if (!token) throw new Error("No token");
      const res = await api.get("cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },
    enabled: !!Cookies.get("token"), // only run if token exists
  });
};
