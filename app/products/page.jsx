'use client';

import React, { useState } from 'react';
import { useProducts } from '@/hooks/useProducts';
import { useCategory } from '@/hooks/useCategory';
import ProductCard from '@/components/Shared/ProductCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

export default function ProductsPage() {
  const [page, setPage] = useState(1);
  const [categoryId, setCategoryId] = useState('');
  const [subcategoryId, setSubcategoryId] = useState('');

  const { data: categoryData } = useCategory();
  const { data, isLoading, isError } = useProducts({
    page,
    category: categoryId,
    subcategory: subcategoryId,
    limit: 12,
  });

  const categories = categoryData?.categories || [];
  const selectedCategory = categories.find((cat) => cat._id === categoryId);

  return (
    <div className="p-6 md:p-12 bg-gradient-to-b from-[#fef9f5] to-[#fff] min-h-screen">
      <h1
        className="text-center text-xl md:text-5xl font-extrabold mb-12 bg-gradient-to-r from-yellow-500 via-amber-600 to-orange-500 bg-clip-text text-transparent"
        style={{ fontFamily: 'var(--font-spectral)' }}
      >
        ✨ Discover Our Golden Collection ✨
      </h1>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        <select
          className="px-4 py-2 rounded-full bg-white border border-gray-300 shadow-sm hover:shadow-md transition-all duration-300"
          value={categoryId}
          onChange={(e) => {
            setCategoryId(e.target.value);
            setSubcategoryId('');
            setPage(1);
          }}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        {selectedCategory?.subcategories?.length > 0 && (
          <select
            className="px-4 py-2 cursor-pointer rounded-full bg-white border border-gray-300 shadow-sm hover:shadow-md transition-all duration-300"
            value={subcategoryId}
            onChange={(e) => {
              setSubcategoryId(e.target.value);
              setPage(1);
            }}
          >
            <option value="">All Subcategories</option>
            {selectedCategory.subcategories.map((sub) => (
              <option key={sub._id} value={sub._id}>
                {sub.name}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Products */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-80 w-full rounded-xl" />
          ))}
        </div>
      ) : isError || !data?.products?.length ? (
        <div className="text-center mt-16 text-gray-500">
          <h2 className="text-xl font-medium">No products found 😕</h2>
          <p className="text-sm mt-1">Try selecting a different category or subcategory.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
            {data.products.map((product) => (
              <ProductCard
                key={product._id}
                id={product._id}
                name={product.name}
                price={product.price}
                coverImages={product.cover_images}
                stars={Math.round(product.rate)}
                reviews={product.reviews?.length || 12}
                isBestSeller={product.isFeatured}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-6">
            <Button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="rounded-full cursor-pointer bg-gradient-to-r from-orange-400 to-yellow-400 text-white hover:opacity-90"
            >
              ← Previous
            </Button>
            <span className="text-lg font-semibold">Page {page}</span>
            <Button
              onClick={() => setPage((prev) => prev + 1)}
              className="rounded-full cursor-pointer bg-gradient-to-r from-yellow-400 to-orange-400 text-white hover:opacity-90"
            >
              Next →
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
