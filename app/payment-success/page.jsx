import PaymentSuccessPage from "@/components/payment/PaymentSuccessPage";
import { Suspense } from "react";


export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-lg font-medium">Loading...</div>}>
      <PaymentSuccessPage />
    </Suspense>
  );
}
