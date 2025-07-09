// hooks/useUserWithWishlist.js or .ts
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api"; // assuming Axios instance
import Cookies from "js-cookie";

export const useUserWithWishlist = () => {
  return useQuery({
    queryKey: ["user", "wishlist"],
    queryFn: async () => {
      const token = Cookies.get("token");
      const { data } = await api.get("wishlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }); // or your actual user endpoint
      return data.user;
    },
  });
};
