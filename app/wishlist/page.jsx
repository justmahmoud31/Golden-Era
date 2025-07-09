"use client";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserWithWishlist } from "@/hooks/useUserWishlist";
import ProductCard from "@/components/Shared/ProductCard";
function WishlistPage() {
  const { data: user, isLoading, isError } = useUserWithWishlist();

  if (isLoading) return <Skeleton className="h-40 w-full" />;
  if (isError || !user)
    return (
      <p className="text-red-500 text-center mt-10">Failed to load wishlist.</p>
    );

  const wishlist = user.wishlist || [];

  return (
    <div className="p-4 md:p-8">
      <h1
        className="text-3xl md:text-4xl font-bold text-center mb-8"
        style={{ fontFamily: "var(--font-spectral)" }}
      >
        Jewelry you’re crushing on
      </h1>

      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {wishlist.map((product) => (
            <ProductCard
              key={product._id}
              id={product._id}
              name={product.name}
              price={product.price}
              coverImages={product.cover_images}
              stars={Math.round(product.rate)}
              reviews={23} // You can pass real review count if available
              isBestSeller={product.isFeatured}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center text-gray-500 mt-16">
          <img
            src="/empty-wishlist.svg"
            alt="Empty Wishlist"
            className="w-40 h-40 mb-6"
          />
          <h2 className="text-xl font-medium mb-2">
            Oops... your wishlist is empty!
          </h2>
          <p className="text-sm">
            Start exploring and add the items you love 💍
          </p>
        </div>
      )}
    </div>
  );
}

export default WishlistPage;
