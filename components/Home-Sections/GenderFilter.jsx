"use client";
import React, { useState } from "react";
import ProductCard from "../Shared/ProductCard";
import Link from "next/link";
import { GrLinkNext } from "react-icons/gr";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const products = {
  Women: [
    {
      name: "Elegant Pearl Necklace",
      reviews: 102,
      imageUrl:
        "https://images.pexels.com/photos/1457983/pexels-photo-1457983.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      isBestSeller: true,
      stars: 5,
      price: 40,
    },
    {
      name: "Golden Ring",
      reviews: 58,
      imageUrl:
        "https://images.pexels.com/photos/1395306/pexels-photo-1395306.jpeg",
      isBestSeller: false,
      stars: 4,
      price: 40,
    },
    {
      name: "Golden Leaf Earrings",
      reviews: 58,
      imageUrl:
        "https://images.pexels.com/photos/1441151/pexels-photo-1441151.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      isBestSeller: true,
      stars: 4,
      price: 40,
    },
     {
      name: "Golden Leaf Earrings",
      reviews: 58,
      imageUrl:
        "https://images.pexels.com/photos/1441151/pexels-photo-1441151.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      isBestSeller: true,
      stars: 4,
      price: 40,
    },
  ],
  Men: [
    {
      name: "Classic Leather Watch",
      reviews: 87,
      imageUrl:
        "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      isBestSeller: true,
      stars: 5,
      price: 40,
    },
    {
      name: "Silver Cuff Bracelet",
      reviews: 39,
      imageUrl:
        "https://images.pexels.com/photos/5690045/pexels-photo-5690045.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      isBestSeller: false,
      stars: 3,
      price: 40,
    },
  ],
};

function GenderFilter() {
  const [selectedGender, setSelectedGender] = useState("Women");

  return (
    <div className="py-10 px-4 relative">
      <h2
        className="font-bold text-center mb-6 text-2xl md:text-3xl"
        style={{ fontFamily: "var(--font-spectral)" }}
      >
        Everyone's favorites, for a reason.
      </h2>

      {/* Tabs */}
      <div className="flex justify-center space-x-6 mb-8">
        {["Women", "Men"].map((gender) => (
          <button
            key={gender}
            onClick={() => setSelectedGender(gender)}
            className={`px-6 py-2 font-semibold text-lg rounded-full transition cursor-pointer ${
              selectedGender === gender ? "underline text-black" : "text-gray-500"
            }`}
            style={{ fontFamily: "var(--font-spectral)" }}
          >
            {gender}
          </button>
        ))}
      </div>

      {/* Swiper Slider */}
      <div className="relative">
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
          {products[selectedGender].map((product, index) => (
            <SwiperSlide key={index}>
              <ProductCard
                name={product.name}
                reviews={product.reviews}
                imageUrl={product.imageUrl}
                isBestSeller={product.isBestSeller}
                stars={product.stars}
                price={product.price}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* CTA Button */}
      <div className="flex justify-center items-center py-8">
        <Link
          href={"/products"}
          className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white font-semibold rounded-full transition hover:bg-gray-800"
        >
          Shop Best Sellers Now <GrLinkNext />
        </Link>
      </div>
    </div>
  );
}

export default GenderFilter;
