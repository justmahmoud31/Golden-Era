"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useProducts } from "@/hooks/useProducts";
import { useUser } from "@/hooks/useUser";
import api from "@/lib/api";
import Cookies from "js-cookie";
import { Heart, ShieldCheck, Truck } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { BsCart } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import { FaRegStar, FaStar } from "react-icons/fa";

export default function ProductDetailPage() {
  const { id } = useParams();
  const { data, isLoading, isError } = useProducts({ id });
  const user = useUser();
  const product = data?.products?.[0];
  const [activeImage, setActiveImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [userName, setUserName] = useState("");
  const [language, setLanguage] = useState("arabic");
  const router = useRouter();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const handleAddToCart = async () => {
    if (!user) {
      router.push("/auth/login");
      return;
    }

    const token = Cookies.get("token");
    if (!token) {
      toast.error("Token missing, please login again.");
      router.push("/auth/login");
      return;
    }

    setIsAddingToCart(true);
    const toastId = toast.loading("Adding to cart...");

    try {
      const body = {
        productId: product._id,
        quantity,
      };

      if (userName.trim() !== "" && language.trim() !== "") {
        body.userName = userName.trim();
        body.language = language;
      }

      await api.post(`cart`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Product added to cart!", { id: toastId });
    } catch (error) {
      toast.error("Failed to add to cart.", { id: toastId });
    } finally {
      setIsAddingToCart(false);
    }
  };

  const imageBaseUrl = process.env.NEXT_PUBLIC_IMG_URL;

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-4 flex flex-col lg:flex-row gap-10">
        <Skeleton className="w-full lg:w-1/2 h-[400px] rounded-xl" />
        <div className="w-full lg:w-1/2 space-y-4">
          <Skeleton className="h-6 w-2/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-10 w-40" />
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <p className="p-4 text-center text-red-500">Failed to load product.</p>
    );
  }

  const {
    name,
    price,
    description,
    type,
    rate,
    stock,
    category,
    subCategory,
    karat,
    size,
    cover_images = [],
    images = [],
    defaultPrice,
    hasName,
  } = product;

  const allImages = [...cover_images, ...images];

  const handleQuantityChange = (e) => {
    const val = parseInt(e.target.value);
    if (!isNaN(val) && val > 0 && val <= stock) {
      setQuantity(val);
    }
  };

  return (
    <div
      className="max-w-6xl mx-auto p-4 flex flex-col lg:flex-row gap-10"
      style={{ fontFamily: "var(--font-spectral)" }}
    >
      {/* Image Preview Section */}
      <div className="flex flex-col lg:flex-row gap-4 w-full lg:w-1/2">
        {/* Thumbnails */}
        <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto max-h-[400px]">
          {allImages.map((img, index) => (
            <img
              key={index}
              src={`${imageBaseUrl}${img}`}
              alt={`Thumbnail ${index + 1}`}
              onClick={() => setActiveImage(`${imageBaseUrl}${img}`)}
              className={`w-20 h-20 object-cover rounded-lg border-2 cursor-pointer transition ${
                activeImage === `${imageBaseUrl}${img}`
                  ? "border-black"
                  : "border-transparent"
              }`}
            />
          ))}
        </div>

        {/* Main Image with Zoom */}
        <div className="flex-1 overflow-hidden relative group">
          <img
            src={activeImage || `${imageBaseUrl}${allImages[0]}`}
            alt={name}
            className="w-full h-[400px] object-cover rounded-xl shadow-md transform transition-transform duration-300 group-hover:scale-125"
          />
        </div>
      </div>

      {/* Product Details Section */}
      <div className="w-full lg:w-1/2">
        <h1 className="text-2xl font-bold mb-2">{name}</h1>
        <p className="text-gray-600 mb-4">{description}</p>

        <div className="flex items-center gap-1 text-yellow-400 mb-2">
          {Array.from({ length: 5 }).map((_, i) =>
            i < Math.round(rate) ? <FaStar key={i} /> : <FaRegStar key={i} />
          )}
          <span className="ml-2 text-sm text-gray-600">{stock} in stock</span>
        </div>

        <p className="text-lg font-semibold text-black mb-2">
          ${price == 0 ? defaultPrice : price}
        </p>

        <div className="mb-4 text-sm text-gray-700 space-y-1">
          <p>
            <strong>Category:</strong> {category?.name}
          </p>
          <p>
            <strong>Subcategory:</strong> {subCategory?.name}
          </p>
          <p>
            <strong>Type:</strong> {type}
          </p>
          <p className={!karat ? "hidden" : "block"}>
            <strong>Karat:</strong> {karat}
          </p>
          <p className={!size ? "hidden" : "block"}>
            <strong>Size:</strong> {size}
          </p>
        </div>
        {/* Quantity Control */}
        <div className="flex items-center gap-4 mt-4">
          <label htmlFor="quantity" className="text-sm font-medium">
            Quantity:
          </label>
          <Input
            id="quantity"
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            min={1}
            max={stock}
            className="w-20"
          />
        </div>
        {hasName ? (
          <div className="flex flex-col my-2 gap-4 w-full">
            {/* User Name Input */}
            <div className="flex flex-col w-full">
              <label htmlFor="userName" className="mb-1 font-medium">
                Name
              </label>
              <input
                id="userName"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="border p-2 rounded-md"
                placeholder="The name to write on the piece"
              />
            </div>

            {/* Language Selection as Buttons */}
            <div className="flex flex-col w-full">
              <label className="mb-1 font-medium">Language</label>
              <div className="flex gap-2">
                {["arabic", "english"].map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => setLanguage(lang)}
                    className={`px-4 py-2 rounded-md  text-sm transition cursor-pointer
              ${
                language === lang
                  ? "bg-neon-gold text-white"
                  : "bg-white text-black  hover:bg-gray-100"
              }`}
                  >
                    {lang.charAt(0).toUpperCase() + lang.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {/* Action Buttons */}
        <div className="flex gap-4 mt-6">
          <Button
            className="flex items-center gap-2 cursor-pointer"
            onClick={handleAddToCart}
            disabled={isAddingToCart}
          >
            <BsCart />
            {isAddingToCart ? "Adding..." : `Add ${quantity} to Cart`}
          </Button>

          <Button variant="outline" className="flex items-center gap-2">
            <CiHeart size={20} />
            Add to Wishlist
          </Button>
        </div>
        {/* Benefits Section */}
        <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-2 gap-2">
          {[
            {
              icon: <Heart className="w-5 h-5 text-[#FFD700]" />, // Gold
              label: "Your order donates to Palestine.",
            },
            {
              icon: <ShieldCheck className="w-5 h-5 text-[#FFD700]" />,
              label: "Lifetime Warranty on All Jewelry",
            },
            {
              icon: <Heart className="w-5 h-5 text-[#FFD700]" />,
              label: "Every Order Donates to Charity",
            },
            {
              icon: <Truck className="w-5 h-5 text-[#FFD700]" />,
              label: "Free US & Canada Returns",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-br from-neon-gold  to-[#eee] text-blck shadow-md hover:shadow-lg transition duration-300"
            >
              <div className="bg-white rounded-full p-2 flex items-center justify-center">
                {item.icon}
              </div>
              <p className="text-sm font-medium tracking-wide">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
