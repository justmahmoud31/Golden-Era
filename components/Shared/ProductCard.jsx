import React, { useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import Link from "next/link";

function ProductCard({
  name,
  reviews,
  coverImages = [],
  isBestSeller,
  stars,
  price,
  id
}) {
  const [hovered, setHovered] = useState(false);
  const currentImageIndex = hovered && coverImages.length > 1 ? 1 : 0;

  return (
    <Link
        href={`/product/${id}`}
      style={{ fontFamily: "var(--font-spectral)" }}
      className="bg-white overflow-hidden group cursor-pointer transition-transform hover:scale-105"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative w-full h-64 overflow-hidden">
        {coverImages.length > 0 ? (
          coverImages.map((img, index) => (
            <img
              key={index}
              src={`${process.env.NEXT_PUBLIC_IMG_URL}${img}`}
              alt={name}
              className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-75 ease-in-out ${
                index === currentImageIndex ? "opacity-100 z-10" : "opacity-0"
              }`}
            />
          ))
        ) : (
          <img
            src="/placeholder.jpg"
            alt="placeholder"
            className="object-cover w-full h-full"
          />
        )}

        {isBestSeller && (
          <span className="absolute top-3 left-3 bg-yellow-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md z-20">
            Best Seller
          </span>
        )}
        <button className="absolute top-3 right-3 text-white font-semibold z-20">
          <CiHeart size={25} />
        </button>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{name}</h3>

        <div className="flex items-center space-x-1 mb-1 text-yellow-400">
          {Array.from({ length: 5 }).map((_, index) =>
            index < stars ? <FaStar key={index} /> : <FaRegStar key={index} />
          )}
          <p className="text-sm text-gray-500">{reviews} reviews</p>
        </div>

        <p className="text-md text-gray-600">{price} $</p>
      </div>
    </Link>
  );
}

export default ProductCard;
