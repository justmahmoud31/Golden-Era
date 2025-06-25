"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import ProductCard from "../Shared/ProductCard";
import Link from "next/link";
import { GrLinkNext } from "react-icons/gr";
function Sakinah() {
  const products = [
    {
      name: "Sakinah Gold Pendant",
      reviews: 112,
      imageUrl:
        "https://images.unsplash.com/photo-1611107683227-e9060eccd846?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      isBestSeller: true,
      stars: 4.8,
      price: "$129.99",
    },
    {
      name: "Elegant Pearl Earrings",
      reviews: 85,
      imageUrl:
        "https://images.unsplash.com/photo-1601121141418-c1caa10a2a0b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      isBestSeller: false,
      stars: 4.5,
      price: "$89.99",
    },
    {
      name: "Minimalist Silver Ring",
      reviews: 60,
      imageUrl:
        "https://images.unsplash.com/photo-1611583027838-515a1087afdb?q=80&w=465&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      isBestSeller: true,
      stars: 4.7,
      price: "$49.99",
    },
    {
      name: "Classic Leather Bracelet",
      reviews: 42,
      imageUrl:
        "https://images.unsplash.com/photo-1641290748359-1d944fc8359a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      isBestSeller: false,
      stars: 4.2,
      price: "$39.99",
    },
    {
      name: "Sakinah Statement Necklace",
      reviews: 130,
      imageUrl:
        "https://images.unsplash.com/photo-1625627796701-e3c0911b89f3?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      isBestSeller: true,
      stars: 5.0,
      price: "$159.99",
    },
  ];

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
          {products.map((product, index) => (
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
      <div className="flex justify-center items-center py-8">
        <Link
          href={"/products"}
          className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white font-semibold rounded-full transition hover:bg-gray-800"
        >
          Shop All New <GrLinkNext />
        </Link>
      </div>
    </div>
  );
}

export default Sakinah;
