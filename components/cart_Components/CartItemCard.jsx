"use client";

import api from "@/lib/api";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { IoIosCloseCircle } from "react-icons/io";
import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

export default function CartItemCard({ item, imageBaseUrl,refetchCart  }) {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);

  const token = Cookies.get("token");

  const handleQuantityChange = async (action) => {
    if (isUpdating) return;

    setIsUpdating(true);
    const toastId = toast.loading(
      `${action === "increment" ? "Increasing" : "Decreasing"} quantity...`
    );

    try {
      await api.patch(
        "cart",
        { productId: item.product._id, action },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Cart updated", { id: toastId });
      await refetchCart();
    } catch (error) {
      console.error("Quantity update error:", error);
      toast.error("Failed to update quantity", { id: toastId });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Removing item...");

    try {
      await api.delete(`cart/${item.product._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Item removed", { id: toastId });
       await refetchCart();
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to remove item", { id: toastId });
    }
  };

  return (
    <div className="flex items-center gap-6 border-b pb-4 hover:bg-gray-50 rounded-lg transition pr-2 relative group">
      <div className="flex items-center gap-6 w-full lg:flex-row flex-col lg:p-0 p-6">
        <img
          src={`${imageBaseUrl}${item.product.cover_images?.[0]}`}
          alt={item.product.name}
          className="lg:w-28 lg:h-28 w-full object-cover rounded-md shadow"
        />
        <div className="flex-1">
          <Link  href={`/product/${item.product._id}`}>
            {" "}
            <h2 className="text-lg font-semibold">{item.product.name}</h2>
          </Link>
          <p className="text-gray-600 text-sm line-clamp-2">
            {item.product.description}
          </p>
          <p className="text-gray-700 mt-1">
            ${item.product.price.toFixed(2)} x {item.quantity} ={" "}
            <span className="font-medium">
              ${(item.product.price * item.quantity).toFixed(2)}
            </span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleQuantityChange("decrement")}
            className="bg-gray-200 text-gray-800 px-2 py-2 rounded hover:bg-gray-300 disabled:opacity-50 cursor-pointer"
            disabled={isUpdating || item.quantity <= 1}
          >
            <FaMinus size={14} />
          </button>
          <span className="text-sm text-gray-800 bg-gold rounded-md px-3 py-1">
            {item.quantity}
          </span>
          <button
            onClick={() => handleQuantityChange("increment")}
            className="bg-gray-200 text-gray-800 px-2 py-2 rounded hover:bg-gray-300 disabled:opacity-50 cursor-pointer"
            disabled={isUpdating}
          >
            <FaPlus size={14} />
          </button>
        </div>
      </div>

      <button
        onClick={handleDelete}
        className="absolute top-2 right-2 text-red-500 hover:text-red-700 transition cursor-pointer"
        title="Remove from cart"
      >
        <IoIosCloseCircle size={24} />
      </button>
    </div>
  );
}
