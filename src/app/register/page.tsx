"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, Input, Button } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import NextLink from "next/link";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const { error: signUpError } = await authClient.signUp.email({
      name,
      email,
      password,
      fetchOptions: {
        onSuccess: () => {
          router.push("/dashboard");
          router.refresh();
        },
        onError: (ctx) => {
          setError(ctx.error.message);
        },
      },
    });

    if (signUpError) {
      setError(signUpError.message || "An error occurred during sign up");
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-1 items-center justify-center p-4 min-h-[calc(100vh-4rem)]">
      <Card className="w-full max-w-md shadow-xl border border-default-200">
        <CardHeader className="flex flex-col gap-1 items-center px-8 pt-8 pb-4">
          <h1 className="text-2xl font-bold">Create an Account</h1>
          <p className="text-sm text-default-500">Sign up to get started</p>
        </CardHeader>
        <CardContent className="px-8 pb-8 flex flex-col gap-4">
          <form className="flex flex-col gap-4" onSubmit={handleRegister}>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">Name</label>
              <Input
                required
                placeholder="Enter your name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">Email</label>
              <Input
                required
                placeholder="Enter your email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">Password</label>
              <Input
                required
                placeholder="Create a password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-danger/10 border border-danger/20 text-danger text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 w-full px-4 py-2 rounded-xl bg-[#1a3a6b] hover:bg-[#152f58] text-white font-semibold"
            >
              {isLoading ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          <p className="text-center text-sm text-default-500">
            Already have an account?{" "}
            <NextLink href="/login" className="text-primary text-sm font-medium hover:underline">
              Sign in
            </NextLink>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
