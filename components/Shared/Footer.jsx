"use client";
import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";

export default function GoldenEraFooter() {
  return (
    <footer className="bg-[#f9f7f3] text-[#1d1d1d] py-12 px-4 lg:px-24 text-sm">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Column 1 */}
        <div>
          <h4 className="font-semibold uppercase tracking-wide mb-3">
            The Brand
          </h4>
          <ul className="space-y-2">
            <li>About Us</li>
            <li>Earn Rewards</li>
            <li>Deed of the Month</li>
            <li>Lifetime Warranty</li>
            <li>20,000+ Reviews</li>
            <li>Download our Mobile App</li>
            <li>Accessibility Statement</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Column 2 */}
        <div>
          <h4 className="font-semibold uppercase tracking-wide mb-3">
            Gift Guide
          </h4>
          <ul className="space-y-2">
            <li>For Her | Top Gifts of 2025</li>
            <li>Above $100</li>
            <li>Below $100</li>
            <li>For Him | Top Gifts of 2025</li>
            <li>Above $100</li>
            <li>Below $100</li>
            <li>Don't Know? → Gift Card</li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h4 className="font-semibold uppercase tracking-wide mb-3">
            Customer Service
          </h4>
          <ul className="space-y-2">
            <li>24/7 Help Center</li>
            <li>Easy Return Policy</li>
            <li>Order Status</li>
            <li>Contact Us</li>
            <li>Suggestion Box</li>
          </ul>
        </div>

        {/* Column 4 */}
        <div className="flex flex-col items-start justify-between h-full">
          <p className="mb-4 text-sm">Yallah, let's connect.</p>
          <div className="flex space-x-3 mb-6">
            <a href="#" className="bg-black text-white p-2 rounded-full">
              <FaFacebookF />
            </a>
            <a href="#" className="bg-black text-white p-2 rounded-full">
              <FaInstagram />
            </a>
            <a href="#" className="bg-black text-white p-2 rounded-full">
              <FaYoutube />
            </a>
            <a href="#" className="bg-black text-white p-2 rounded-full">
              <FaTiktok />
            </a>
          </div>
          <p className="text-sm mb-2">
            <span className="font-semibold">Let’s Chat:</span>{" "}
            <a href="mailto:support@golden-era.com" className="hover:underline">
              support@golden-era.com
            </a>
          </p>
          <p className="text-sm mb-2">
            <span className="font-semibold">Call or WhatsApp Us:</span>{" "}
            +1 888-793-6433
          </p>
          <p className="text-sm">
            <span className="font-semibold">Phone Support Hours:</span>{" "}
            Monday – Friday, 9 AM – 5 PM MST
          </p>
        </div>
      </div>

      {/* Logo */}
      <div className="mt-12 text-center text-xl font-bold tracking-wide">
        Turmusayacreations
      </div>
    </footer>
  );
}
