"use client";

import React, { useState } from "react";
import ProductCard from "../Shared/ProductCard";
import Link from "next/link";
import { GrLinkNext } from "react-icons/gr";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useProducts } from "@/hooks/useProducts";

function GenderFilter() {
  const [selectedGender, setSelectedGender] = useState("Women");

  const categoryName = selectedGender.toLowerCase(); // women || men
  const { data, isLoading, isError } = useProducts({
    page: 1,
    limit: 10,
    categoryName,
  });

  const products = data?.products || [];

  return (
    <div className="py-10 px-4 relative">
      <h2
        className="font-bold text-center mb-6 text-2xl md:text-3xl"
        style={{ fontFamily: "var(--font-spectral)" }}
      >
        Everyone&apos;s favorites, for a reason.
      </h2>

      {/* Tabs */}
      <div className="flex justify-center space-x-6 mb-8">
        {["Women", "Men"].map((gender) => (
          <button
            key={gender}
            onClick={() => setSelectedGender(gender)}
            className={`px-6 py-2 font-semibold text-lg rounded-full transition cursor-pointer ${
              selectedGender === gender
                ? "underline text-black"
                : "text-gray-500"
            }`}
            style={{ fontFamily: "var(--font-spectral)" }}
          >
            {gender}
          </button>
        ))}
      </div>

      {/* Swiper Slider */}
      <div className="relative min-h-[200px]">
        {isLoading ? (
          <p className="text-center">Loading products...</p>
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

      {/* CTA Button */}
      <div className="flex justify-center items-center py-8">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white font-semibold rounded-full transition hover:bg-gray-800"
        >
          Shop Best Sellers Now <GrLinkNext />
        </Link>
      </div>
    </div>
  );
}

export default GenderFilter;
