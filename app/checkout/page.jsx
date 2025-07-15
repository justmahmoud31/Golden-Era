"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/hooks/useUser";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { FaMapMarkerAlt, FaBoxOpen, FaCreditCard } from "react-icons/fa";
import Cookies from "js-cookie";

export default function CheckoutPage() {
  const user = useUser();
  const router = useRouter();
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [useCustomAddress, setUseCustomAddress] = useState(false);
  const [customAddress, setCustomAddress] = useState("");
  const [userName, setUserName] = useState(user?.firstName || "");
  const [language, setLanguage] = useState("English");

  useEffect(() => {
    if (user === null) {
      router.push("/auth/login");
    }

    const fetchSummary = async () => {
      try {
        const token = Cookies.get("token");
        const res = await api.get("checkout", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSummary(res.data);
      } catch (err) {
        console.error("Checkout fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchSummary();
  }, [user, router]);

  const handleCheckout = async () => {
    try {
      setProcessing(true);
      const token = Cookies.get("token");

      let orderPayload;

      if (useCustomAddress && customAddress.trim() !== "") {
        orderPayload = {
          address: customAddress.trim(),
          userName,
          language,
        };
      } 
      const orderRes = await api.post("/order", orderPayload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const orderId = orderRes.data._id;

      const sessionRes = await api.post(
        "/payment/create-checkout-session",
        { orderId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (sessionRes.data.url) {
        window.location.href = sessionRes.data.url;
      } else {
        throw new Error("Stripe session failed");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Something went wrong. Please try again.");
      setProcessing(false);
    }
  };

  if (!user || loading) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 space-y-6">
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-64 w-full rounded-lg" />
      </div>
    );
  }

  if (!summary) {
    return (
      <p className="text-center text-red-500 mt-12">
        Failed to load checkout details.
      </p>
    );
  }

  const address = summary.addresses?.[0];
  const cart = summary.cart;

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 font-sans">
      <h1 className="text-3xl font-bold text-center mb-8">Checkout Summary</h1>

      <div className="bg-white border shadow-md rounded-lg p-6 space-y-6">
        {/* Address */}
        {/* <div className="flex gap-3 items-start">
          <FaMapMarkerAlt className="text-main mt-1" />
          <div>
            <p className="font-semibold mb-1">Shipping Address</p>
            {address ? (
              <p className="text-gray-700">
                {address.street}, {address.city}
              </p>
            ) : (
              <p className="text-red-500">No address found.</p>
            )}
          </div>
        </div> */}

        {/* Cart Items */}
        <div>
          <div className="flex gap-3 items-center mb-2">
            <FaBoxOpen className="text-main" />
            <p className="font-semibold">Items in Cart</p>
          </div>
          <div className="divide-y">
            {cart.items.map((item) => (
              <div
                key={item.product._id}
                className="flex justify-between items-center py-3"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={`${process.env.NEXT_PUBLIC_IMG_URL}${item.product.image}`}
                    alt={item.product.name}
                    width={60}
                    height={60}
                    className="rounded-md border object-cover"
                  />
                  <div>
                    <p className="text-sm font-medium">{item.product.name}</p>
                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                </div>
                <p className="font-semibold text-sm">
                  ${(item.subtotal || 0).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Total */}
        <div className="text-right border-t pt-4">
          <p className="text-xl font-bold">Total: ${cart.total.toFixed(2)}</p>
        </div>
        
        <div className="space-y-4">
          <p className="font-semibold">Select Shipping Method:</p>
          <div className="flex gap-6">
           
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={useCustomAddress}
                onChange={() => setUseCustomAddress(true)}
              />
              Enter address
            </label>
          </div>

         
            <input
              type="text"
              placeholder="Enter new address (e.g. Cairo, Nasr City)"
              value={customAddress}
              onChange={(e) => setCustomAddress(e.target.value)}
              className="w-full mt-2 border rounded px-4 py-2"
            />
         
        </div>

        {/* Checkout Button */}
        <div className="flex justify-end">
          <Button
            onClick={handleCheckout}
            disabled={processing}
            className="bg-main hover:bg-gray-800 text-white px-6 py-3 text-sm rounded-md flex items-center gap-2"
          >
            <FaCreditCard />
            {processing ? "Processing..." : "Proceed to Payment"}
          </Button>
        </div>
      </div>
    </div>
  );
}
