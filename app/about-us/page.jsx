"use client";

import Image from "next/image";
import React from "react";

export default function AboutPage() {
  return (
    <section className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[300px] sm:h-[400px] md:h-[500px] w-full">
        <Image
          src="https://images.pexels.com/photos/1676126/pexels-photo-1676126.jpeg" // <-- Replace with your image path in public folder
          alt="Turmusaya Jewelry Showcase"
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 bg-opacity-40">
          <h1 className="text-white text-3xl sm:text-5xl font-bold tracking-wide">
            About Turmusaya Jewelry
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
        {/* Text Content */}
        <div className="space-y-6 text-gray-700">
          <h2 className="text-2xl font-bold text-black">
            Where Heritage Meets Refinement
          </h2>
          <p>
            At <strong>Turmusaya Jewelry</strong>, we take pride in offering the
            largest collection of Middle Eastern gold in the United States. With
            over <strong>15 years of dedicated service</strong>, we’ve built a
            reputation rooted in excellence, authenticity, and craftsmanship.
          </p>
          <p>
            Our diverse selection is inspired by the rich cultural heritage and
            timeless designs of the Middle East — each piece thoughtfully
            curated to reflect both tradition and elegance.
          </p>
          <p>
            We are committed to delivering exceptional customer service and a
            seamless shopping experience. With fast, secure{" "}
            <strong>nationwide shipping</strong>, we bring the beauty of Middle
            Eastern gold directly to your doorstep.
          </p>
        </div>

        {/* Side Image */}
        <div className="w-full">
          <Image
            src="https://images.pexels.com/photos/1453008/pexels-photo-1453008.jpeg" // <-- Replace with your image path
            alt="Middle Eastern Gold Jewelry"
            width={600}
            height={400}
            className="rounded-lg shadow-lg w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>
  );
}
