"use client";
import ProductCard from "@/components/Shared/ProductCard";
import { useProducts } from "@/hooks/useProducts";
import { useParams } from "next/navigation";
import React from "react";
import NotFoundProduct from "@/public/NotFoundProduct.png";
function page() {
  const { slug } = useParams();
  const { data, isLoading, isError } = useProducts({
    page: 1,
    limit: 10,
    subcategoryName: slug,
  });
  const products = data?.products || [];
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6 capitalize">
          Loading products...
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-sm animate-pulse space-y-4"
            >
              <div className="w-full h-40 bg-gray-200 rounded-lg" />
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
              <div className="h-6 bg-gray-300 rounded w-1/3" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError || !products.length) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center space-y-4">
        <img
          src={NotFoundProduct.src}
          alt="No products"
          width={300}
          height={300}
        />
        <h2 className="text-xl font-semibold text-gray-700">
          No products found
        </h2>
        <p className="text-gray-500">Try searching a different subcategory.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 capitalize">
        Products in "{slug}"
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            id={product._id}
            name={product.name}
            reviews={product.reviewsCount}
            coverImages={product.cover_images}
            isBestSeller={product.isBestSeller}
            stars={product.stars}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
}

export default page;
