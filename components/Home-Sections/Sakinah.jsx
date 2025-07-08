"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import ProductCard from "../Shared/ProductCard";
import Link from "next/link";
import { GrLinkNext } from "react-icons/gr";
import { useProducts } from "@/hooks/useProducts";
import { Skeleton } from "@/components/ui/skeleton";

function Sakinah() {
  const { data, isLoading, isError } = useProducts({
    page: 1,
    limit: 10,
    categoryName: "Sakinah",
  });

  const products = data?.products || [];

  return (
    <div className="py-10 px-4 relative">
      <h2 className="font-semibold text-center mb-6 text-lg md:text-xl">
        Fresh out of the Design Studio | Available Now
      </h2>
      <h2
        className="font-bold text-center mb-6 text-2xl md:text-3xl"
        style={{ fontFamily: "var(--font-spectral)" }}
      >
        The Sakinah Collection
      </h2>

      {/* Swiper or loading state */}
      <div className="relative min-h-[200px]">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="space-y-4">
                <Skeleton className="h-64 w-full rounded-xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : isError ? (
          <p className="text-center text-red-500">Failed to load products.</p>
        ) : products.length === 0 ? (
          <p className="text-center">No products found.</p>
        ) : (
          <Swiper
            modules={[Navigation]}
            spaceBetween={24}
            navigation
            breakpoints={{
              320: { slidesPerView: 1.1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-5"
          >
            {products.map((product) => (
              <SwiperSlide key={product._id}>
                <ProductCard
                  name={product.name}
                  reviews={product.stock || 0}
                  coverImages={product.cover_images || []}
                  isBestSeller={product.isFeatured}
                  stars={product.rate || 4}
                  price={product.price}
                  id={product._id}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      {/* CTA */}
      <div className="flex justify-center items-center py-8">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white font-semibold rounded-full transition hover:bg-gray-800"
        >
          Shop All New <GrLinkNext />
        </Link>
      </div>
    </div>
  );
}

export default Sakinah;
