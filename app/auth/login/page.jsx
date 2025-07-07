'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: async () => {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_IMG_URL}api/auth/login`, {
        email,
        password,
      });
      return res.data;
    },
    onSuccess: (data) => {
      Cookies.set('token', data.token, { expires: 7 });
      toast.success('Login successful');
      router.push('/');
      
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || 'Login failed');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation.mutate();
  };

  return (
    <div className="flex items-center justify-center my-12 px-4" style={{ fontFamily: "var(--font-spectral)" }}>
      <Card className="w-full max-w-md p-6 shadow-xl border rounded-2xl">
        <h1 className="text-2xl font-semibold text-center mb-6">Login</h1>
        <p className="text-lg  text-center mb-6">Login to your account to get more and more</p>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@turmusayacreations.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Link className='text-semibold text-sm' href={'/auth/register'}>Don't have an account ? <span className='text-main'>Register</span></Link>
            <button type="submit" className="w-full cursor-pointer my-4 bg-neon-gold rounded-md py-2 font-semibold" disabled={loginMutation.isPending}>
              {loginMutation.isPending ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
