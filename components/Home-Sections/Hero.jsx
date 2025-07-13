import Link from "next/link";
import React from "react";
import { GrLinkNext } from "react-icons/gr";
import { FaClock, FaUndoAlt } from "react-icons/fa";

function Hero() {
  return (
    <section className="relative h-screen w-full">
      {/* Background image with dark overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center brightness-[0.6]"
        style={{
          backgroundImage:
            'url("https://images.pexels.com/photos/248077/pexels-photo-248077.jpeg")',
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />

      {/* Content */}
      <div style={{ fontFamily: "var(--font-spectral)" }} className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4 text-center">
        <div className="backdrop-blur-md bg-white/10 p-8 rounded-xl shadow-xl max-w-2xl">
          <h2 className="lg:text-5xl text-2xl font-bold mb-4 tracking-wide">Turmusaya jewellery</h2>
          <p className="lg:text-lg mb-6 font-medium">
             Largest collection of Middle Eastern Gold in the USA
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white font-semibold rounded-full hover:bg-white hover:text-black transition"
          >
            Shop Now <GrLinkNext />
          </Link>
        </div>

        {/* Cards */}
        <div className="flex flex-col md:flex-row gap-6 mt-10">
          {/* 24/7 Support Card */}
          <div className="flex items-center gap-4 bg-white/20 backdrop-blur-lg p-5 rounded-lg shadow-md text-left text-white max-w-xs">
            <FaClock className="text-3xl" />
            <div>
              <h4 className="text-lg font-bold">24/7 Support</h4>
              <p className="text-sm">We are here around the clock for you</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white/20 backdrop-blur-lg p-5 rounded-lg shadow-md text-left text-white max-w-xs">
            <FaUndoAlt className="text-3xl" />
            <div>
              <h4 className="text-lg font-bold">Shipping Nationwide</h4>
              <p className="text-sm">Your product got shipped for you</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
