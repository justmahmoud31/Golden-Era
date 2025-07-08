"use client";

import api from "@/lib/api";
import anim from "@/public/anim.gif";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [verified, setVerified] = useState(false);
  const [counter, setCounter] = useState(5);
  const [loading, setLoading] = useState(true);

  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    const verifySession = async () => {
      try {
        const res = await api.post("payment/verify-session", {
          session_id: sessionId,
        });
        if (res.status === 200) {
          setVerified(true);
        } else {
          throw new Error("Invalid session");
        }
      } catch (err) {
        console.error("Payment verification failed:", err);
        router.push("/cart");
      } finally {
        setLoading(false);
      }
    };

    if (sessionId) verifySession();
    else router.push("/");
  }, [sessionId, router]);

  useEffect(() => {
    if (verified) {
      const interval = setInterval(() => {
        setCounter((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            router.push("/");
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [verified, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-semibold">Verifying payment...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-gray-50">
      {verified ? (
        <>
          <div className="w-48 h-48 mb-6">
            <img src={anim.src} alt="Success" />
          </div>
          <h1 className="text-2xl font-bold mb-2 text-green-700">
            Payment Confirmed!
          </h1>
          <p className="text-gray-700 mb-6">
            Thank you for your purchase. Redirecting you in{" "}
            <span className="font-semibold">{counter}</span> seconds...
          </p>
        </>
      ) : (
        <div className="text-red-500 font-bold text-lg">
          Payment verification failed.
        </div>
      )}
    </div>
  );
}
