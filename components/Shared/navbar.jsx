'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCategory } from '@/hooks/useCategory';
import { useUser } from '@/hooks/useUser';
import Cookies from 'js-cookie';
import { toast } from 'react-hot-toast';

import {
  FaBars,
  FaHeart,
  FaUser,
  FaShoppingBag,
  FaSearch,
} from 'react-icons/fa';

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';

const Navbar = () => {
  const { data, isLoading, isError } = useCategory();
  const [openCategory, setOpenCategory] = useState(null);
  const timeoutRef = useRef(null);
  const user = useUser();
  const router = useRouter();

  const handleMouseEnter = (id) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenCategory(id);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpenCategory(null), 150);
  };

  const renderSkeletons = (count = 5) =>
    Array.from({ length: count }).map((_, i) => (
      <Skeleton key={i} className="h-4 w-32 rounded bg-gray-200" />
    ));

  const handleLogout = () => {
    Cookies.remove('token');
    toast.success('Logged out');
    router.push('/');
    window.location.reload();
  };

  return (
    <header className="w-full border-b bg-white shadow-sm">
      {/* Top Row */}
      <div
        className="flex items-center justify-between px-4 py-3 md:px-8"
        style={{ fontFamily: 'var(--font-spectral)' }}
      >
        <Link href="/" className="text-2xl font-semibold tracking-widest">
          Golden Era
        </Link>

        <div className="hidden md:flex w-full max-w-xl mx-8">
          <Input
            placeholder="What can we help you find?"
            className="rounded-r-none border-r-0"
          />
          <Button className="rounded-l-none bg-main hover:bg-gray-800">
            <FaSearch className="text-white" />
          </Button>
        </div>

        <div className="hidden md:flex items-center space-x-6 text-black text-lg">
          <FaHeart className="cursor-pointer" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <FaUser className="cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40 mt-2">
              {user ? (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/profile">My Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/orders">My Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/auth/login" className='cursor-pointer'>Login</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/auth/register" className='cursor-pointer'>Signup</Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
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
            <SheetContent side="left" className="w-[270px] p-4">
              <div className="flex flex-col space-y-4 mt-8">
                <Link href="/" className="text-lg font-semibold">
                  Golden Era
                </Link>

                {isLoading ? (
                  <div className="space-y-3">{renderSkeletons(6)}</div>
                ) : isError ? (
                  <span>Error loading categories</span>
                ) : (
                  data?.categories?.map((category) => (
                    <div key={category._id}>
                      <button
                        onClick={() =>
                          setOpenCategory(
                            openCategory === category._id ? null : category._id
                          )
                        }
                        className="w-full text-left text-gray-800 font-medium"
                      >
                        {category.name}
                      </button>

                      <div
                        className={`pl-4 mt-1 space-y-1 overflow-hidden transition-all duration-300 ${
                          openCategory === category._id
                            ? 'max-h-[500px] opacity-100'
                            : 'max-h-0 opacity-0'
                        }`}
                      >
                        {category.subcategories?.map((sub) => (
                          <Link
                            key={sub._id}
                            href={`/subcategory/${sub.name.toLowerCase()}`}
                            className="text-sm text-gray-600 block"
                          >
                            - {sub.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex justify-center space-x-8 py-2 text-sm font-semibold text-gray-700 relative z-10">
        {isLoading ? (
          <div className="flex gap-6">{renderSkeletons(6)}</div>
        ) : isError ? (
          <span>Error loading categories</span>
        ) : (
          data?.categories?.map((category) => (
            <div
              key={category._id}
              className="relative"
              onMouseEnter={() => handleMouseEnter(category._id)}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href={`/category/${category.name.toLowerCase()}`}
                className="hover:text-main hover:underline underline-offset-4 transition-all duration-200"
              >
                {category.name}
              </Link>

              {category.subcategories?.length > 0 &&
                openCategory === category._id && (
                  <div className="absolute left-1/2 top-full mt-3 -translate-x-1/2 bg-white shadow-xl border rounded-lg px-5 py-4 w-[700px] max-h-[300px] overflow-y-auto opacity-100 scale-100 translate-y-0 visible pointer-events-auto transition-all duration-300 ease-in-out z-50">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {category.subcategories.map((sub) => (
                        <Link
                          key={sub._id}
                          href={`/subcategory/${sub.name.toLowerCase()}`}
                          className="text-gray-600 hover:text-main text-sm"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          ))
        )}
      </nav>
    </header>
  );
};

export default Navbar;
