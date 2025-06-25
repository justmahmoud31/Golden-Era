"use client";
import Link from "next/link";
import React from "react";

function WhyUs() {
  return (
    <div className="flex flex-col my-12">
      <h2
        className="text-center font-semibold lg:text-xl text-lg"
        style={{ fontFamily: "var(--font-spectral)" }}
      >
        Why Golden Era ?
      </h2>

      <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-24 gap-8 lg:px-24 my-4 px-4">
        {[
          // You can map this if needed
          {
            title: "Our Story",
            image:
              "https://images.pexels.com/photos/754194/pexels-photo-754194.jpeg",
            button: "Explore who we are",
          },
          {
            title: "Modern Elegance",
            image:
              "https://images.pexels.com/photos/4046710/pexels-photo-4046710.jpeg",
            button: "View Designs",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="w-full relative group overflow-hidden rounded-md"
          >
            <img
              src={item.image}
              alt={item.title}
              className="h-[600px] w-full object-cover"
            />

            <div
              style={{ fontFamily: "var(--font-spectral)" }}
              className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition duration-300 flex flex-col items-center justify-center text-white text-center px-4"
            >
              <h1 className="text-2xl lg:text-3xl font-bold mb-4">
                {item.title}
              </h1>
              <Link href={'/about'} className="px-5 py-2 bg-transparent border border-white  font-semibold  hover:bg-gray-200 hover:text-black transition">
                {item.button}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WhyUs;
