'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone_number: '',
    city: '',
    street: '',
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const signupMutation = useMutation({
    mutationFn: async () => {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_IMG_URL}api/auth/signup`, {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
        phone_number: form.phone_number,
        addresses: [
          {
            city: form.city,
            street: form.street,
          },
        ],
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success('Registration successful');
      router.push('/auth/login');
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || 'Something went wrong. Try again.'
      );
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    signupMutation.mutate();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4" style={{ fontFamily: "var(--font-spectral)" }}>
      <Card className="w-full max-w-md p-6 shadow-xl border rounded-2xl">
        <h1 className="text-2xl font-semibold text-center mb-6">Create Account</h1>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="phone_number">Phone Number</Label>
              <Input
                id="phone_number"
                name="phone_number"
                value={form.phone_number}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="street">Street</Label>
                <Input
                  id="street"
                  name="street"
                  value={form.street}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <Link href={'/auth/login'} className='my-4'>Already have an Account ? <span>Login</span></Link>
            <Button
              type="submit"
              className="w-full mt-4"
              disabled={signupMutation.isPending}
            >
              {signupMutation.isPending ? 'Creating account...' : 'Register'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
