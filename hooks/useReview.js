import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useReview = (id) => {
  return useQuery({
    queryKey: ["review"],
    queryFn: async () => {
      const response = await api.get(`/review?product=${id}`);
      console.log(response.data);
      return response.data;
    },
  });
};
