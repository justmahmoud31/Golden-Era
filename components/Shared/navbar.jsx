'use client';

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { FaBars, FaHeart, FaUser, FaShoppingBag, FaSearch } from "react-icons/fa";

const Navbar = () => {
  return (
    <header className="w-full border-b bg-white shadow-sm">
      {/* Top Row */}
      <div className="flex items-center justify-between px-4 py-3 md:px-8" style={{ fontFamily: "var(--font-spectral)" }}>
        {/* Logo */}
        <Link href="/" className="text-2xl font-semibold tracking-widest">
          Golden Era
        </Link>

        {/* Search bar */}
        <div className="hidden md:flex w-full max-w-xl mx-8">
          <Input
            placeholder="What can we help you find?"
            className="rounded-r-none border-r-0"
          />
          <Button className="rounded-l-none bg-main hover:bg-gray-800">
            <FaSearch className="text-white" />
          </Button>
        </div>

        {/* Right icons */}
        <div className="hidden md:flex items-center space-x-6 text-black text-lg">
          <FaHeart className="cursor-pointer" />
          <FaUser className="cursor-pointer" />
          <FaShoppingBag className="cursor-pointer" />
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <FaBars className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[250px] p-4">
              <div className="flex flex-col space-y-4 mt-8">
                <Link href="/" className="text-lg font-semibold">
                  NOMINAL
                </Link>
                <Link href="/women" className="text-gray-700">
                  Women
                </Link>
                <Link href="/men" className="text-gray-700">
                  Men
                </Link>
                <Link href="/bestsellers" className="text-gray-700">
                  Best Sellers
                </Link>
                <Link href="/new" className="text-gray-700">
                  New
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Navigation Links Below */}
      <nav className="hidden md:flex justify-center space-x-8 py-2 text-sm font-semibold text-gray-700">
        <Link href="/women" className="hover:text-black">WOMEN</Link>
        <Link href="/men" className="hover:text-black">MEN</Link>
        <Link href="/bestsellers" className="hover:text-black">BEST SELLERS</Link>
        <Link href="/new" className="hover:text-black">NEW</Link>
      </nav>
    </header>
  );
};

export default Navbar;
