import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
function ProductCard({ name, reviews, imageUrl, isBestSeller, stars,price }) {
  return (
    <div style={{ fontFamily: "var(--font-spectral)" }} className="bg-white   overflow-hidden group cursor-pointer transition-transform hover:scale-105">
      <div className="relative w-full h-64 overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
        />

        {isBestSeller && (
          <span className="absolute top-3 left-3 bg-yellow-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
            Best Seller
          </span>
        )}
          <button className="absolute top-3 right-3 text-white font-semibold">
            <CiHeart size={25}/>
          </button>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{name}</h3>

        <div className="flex items-center space-x-1 mb-1 text-yellow-400">
          {Array.from({ length: 5 }).map((_, index) =>
            index < stars ? (
              <FaStar key={index} />
            ) : (
              <FaRegStar key={index} />
            )
          )}
        <p className="text-sm text-gray-500">{reviews} reviews</p>
        </div>

        <p className="text-md text-gray-600">{price} $</p>
      </div>
    </div>
  );
}

export default ProductCard;
