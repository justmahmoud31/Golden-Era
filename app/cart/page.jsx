"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/hooks/useCart";
import { useUser } from "@/hooks/useUser";
import toast from "react-hot-toast";
import CartItemCard from "@/components/cart_Components/CartItemCard";
import empty from "@/public/empty.png";
import { BiSolidTrashAlt } from "react-icons/bi";
import { IoCartOutline } from "react-icons/io5";
import api from "@/lib/api";
import Cookies from "js-cookie";
export default function CartPage() {
  const router = useRouter();
  const user = useUser();
  const imageBaseUrl = process.env.NEXT_PUBLIC_IMG_URL;
  const { data: cart, isLoading, isError, refetch } = useCart();
  useEffect(() => {
    if (user === null) {
      router.push("/auth/login");
    }
  }, [user, router]);

  if (user === undefined || user === null) return null;

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
        <div className="grid gap-4">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton className="w-28 h-28 rounded-lg" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/3" />
              </div>
              <Skeleton className="h-4 w-12" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError || !cart) {
    toast.error("Failed to fetch cart.");
    return null;
  }

  if (cart.items.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col justify-center items-center text-center px-4">
        <img
          src={empty.src}
          alt="Empty Cart"
          className="w-64 h-64 object-contain mb-6"
        />
        <h1 className="text-3xl font-bold mb-2">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-6 max-w-md">
          Looks like you haven’t added anything to your cart yet. Explore our
          categories and discover amazing products!
        </p>
        <Link href="/products">
          <Button className="bg-black text-white hover:bg-gray-800 px-6 py-2 rounded-full">
            Browse Products
          </Button>
        </Link>
      </div>
    );
  }

  const total = cart.items.reduce(
    (acc, item) => acc + item.quantity * item.product.price,
    0
  );
const handleDelete = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Removing item...");
    const token = Cookies.get("token");
    try {
      await api.delete(`cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Cart Cleared", { id: toastId });
       await refetch();
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to remove item", { id: toastId });
    }
  };
  return (
    <div
      className="max-w-6xl mx-auto p-6"
      style={{ fontFamily: "var(--font-spectral)" }}
    >
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold mb-8 flex items-center justify-center gap-1">
          <IoCartOutline /> Your Shopping Cart
        </h1>
        <button onClick={handleDelete} className="bg-transparent border border-red-600 outline-none text-red-600 p-2 rounded-sm cursor-pointer flex items-center justify-center gap-1">
          <BiSolidTrashAlt /> Clear Cart
        </button>
      </div>
      <div className="grid gap-6">
        {cart.items.map((item) => (
          <CartItemCard
            key={item._id}
            item={item}
            imageBaseUrl={imageBaseUrl}
            refetchCart={refetch}
          />
        ))}
      </div>

      <div className="flex justify-end mt-8">
        <div className="text-right space-y-2">
          <p className="text-lg font-semibold">
            Total: <span className="text-black">${total.toFixed(2)}</span>
          </p>
          <Button className="bg-black text-white hover:bg-gray-800 cursor-pointer">
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}
