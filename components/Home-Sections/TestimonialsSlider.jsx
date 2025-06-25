"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaCheckCircle, FaStar } from "react-icons/fa";
import { GrLinkNext } from "react-icons/gr";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const testimonials = [
  {
    name: "Lucy S.",
    title: "Beautiful Jewelry And Even Better Mission.",
    content:
      "I could not be happier with my purchase – my ring is beautiful and I love it so much.",
    timeAgo: "13 hours ago",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    buyerImage:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Lesley H.",
    title: "Necklace",
    content:
      "Love it and perfect length, defeintliy that will not be my last deal with them ",
    timeAgo: "14 hours ago",
    image: "https://randomuser.me/api/portraits/women/72.jpg",
    buyerImage:
      "https://images.unsplash.com/photo-1505483531331-fc3cf89fd382?q=80&w=876&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Shelley B.",
    title: "High Quality",
    content:
      "These stickers are high quality and arrived very quickly to Australia. I will definitely buy from this company again.",
    timeAgo: "16 hours ago",
    image: "https://randomuser.me/api/portraits/women/75.jpg",
    buyerImage:
      "https://plus.unsplash.com/premium_photo-1670282393309-70fd7f8eb1ef?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Shelley B.",
    title: "High Quality",
    content:
      "These stickers are high quality and arrived very quickly to Australia. I will definitely buy from this company again.",
    timeAgo: "16 hours ago",
    image: "https://randomuser.me/api/portraits/women/75.jpg",
    buyerImage:
      "https://plus.unsplash.com/premium_photo-1666264200737-acad542a92ff?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];
export default function TestimonialsSlider() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;
  return (
    <div className="my-12 lg:px-24 px-4 md:px-8   overflow-hidden relative">
      <h2
        className="text-2xl md:text-3xl font-bold text-center mb-8"
        style={{ fontFamily: "var(--font-spectral)" }}
      >
        What People Are Saying
      </h2>
      <div className="w-full">
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
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col justify-between lg:h-96  p-6 bg-white rounded-md shadow-sm text-center">
                {/* Stars */}
                <div className="flex justify-center mb-3 text-[#A67C52]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FaStar key={i} className="text-xl mx-0.5" />
                  ))}
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>

                {/* Content */}
                <p className="text-gray-600 mb-2">{item.content}</p>

                {/* Time */}
                <p className="text-sm text-gray-400 mb-4">{item.timeAgo}</p>

                <hr className="my-2" />

                {/* Footer */}
                <div className="flex justify-between items-center mt-4 text-left">
                  <div>
                    <p className="font-semibold">
                      {item.name}{" "}
                      <span className="font-normal text-sm text-gray-500 ml-1">
                        Verified Buyer{" "}
                        <FaCheckCircle className="inline text-blue-500 ml-1" />
                      </span>
                    </p>
                  </div>
                  <img
                    src={item.buyerImage}
                    alt={item.title}
                    className="w-12 h-12 rounded-sm object-cover ml-2"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="flex justify-center items-center py-8">
        <Link
          href={"/products"}
          className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white font-semibold rounded-full transition hover:bg-gray-800"
          style={{ fontFamily: "var(--font-spectral)" }}
        >
          Read All Reviews <GrLinkNext />
        </Link>
      </div>
    </div>
  );
}
