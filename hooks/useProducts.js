import api from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

export const useProducts = (page,category,subcategory,limit) => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await api.get(`/product?page=${page}`);
      return response.data;
    },
  });
};