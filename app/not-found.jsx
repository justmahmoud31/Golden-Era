'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import notfound from '@/public/notfound.png';
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-12">
      <Image
        src={notfound.src}
        alt="Lost in space"
        width={300}
        height={300}
        className="mb-8"
      />
      <h1 className="text-5xl font-extrabold mb-4 text-gray-900">Oops!</h1>
      <h2 className="text-2xl font-semibold mb-2 text-gray-800">
        This page drifted off into space 🌌
      </h2>
      <p className="text-gray-600 max-w-md mb-6">
        We couldn’t find the page you’re looking for. Maybe it went on vacation — or maybe a cosmic cat knocked it off the internet shelf.
      </p>
      <Link href="/">
        <Button className="bg-black text-white hover:bg-gray-800 px-6 py-2 rounded-full">
          Back to Earth (Home)
        </Button>
      </Link>
    </div>
  );
}
