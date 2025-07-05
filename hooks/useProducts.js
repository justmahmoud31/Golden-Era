import api from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

export const useProducts = ({
  id,
  page,
  category,
  subcategory,
  limit,
  categoryName,
} = {}) => {
  return useQuery({
    queryKey: ['products', { id, page, category, subcategory, limit, categoryName }],
    queryFn: async () => {
      const params = new URLSearchParams();

      if (id) params.append('id', id);
      if (page) params.append('page', page);
      if (category) params.append('category', category);
      if (subcategory) params.append('subCategory', subcategory);
      if (limit) params.append('limit', limit);
      if (categoryName) params.append('categoryName', categoryName);

      const response = await api.get(`/product?${params.toString()}`);
      return response.data;
    },
  });
};
