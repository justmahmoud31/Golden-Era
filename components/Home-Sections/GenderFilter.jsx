"use client";
import React, { useState } from "react";
import ProductCard from "../Shared/ProductCard";
import Link from "next/link";
import { GrLinkNext } from "react-icons/gr";

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
    <div className="py-10 px-4">
      <h2
        className="font-bold text-center mb-6 "
        style={{ fontFamily: "var(--font-spectral)" }}
      >
        Everyone's favorites, for a reason.
      </h2>

      {/* Tabs */}
      <div className="flex justify-center space-x-6 mb-8">
        {["Women", "Men"].map((gender) => (
          <button
            key={gender}
            style={{ fontFamily: "var(--font-spectral)" }}
            onClick={() => setSelectedGender(gender)}
            className={`px-6 py-2 font-semibold text-lg rounded-full transition cursor-pointer ${
              selectedGender === gender ? "underline text-black" : "text-black"
            }`}
          >
            {gender}
          </button>
        ))}
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products[selectedGender].map((product, index) => (
          <ProductCard
            key={index}
            name={product.name}
            reviews={product.reviews}
            imageUrl={product.imageUrl}
            isBestSeller={product.isBestSeller}
            stars={product.stars}
            price={product.price}
          />
        ))}
      </div>
      <div className="flex justify-center items-center py-8">
        <Link
          href={"/products"}
          className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white font-semibold rounded-full transition"
        >
          Shop Best Sellers Now <GrLinkNext />
        </Link>
      </div>
    </div>
  );
}

export default GenderFilter;
