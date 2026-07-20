"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, Input, Button, Link } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import NextLink from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setError(null);

    const { error: signInError } = await authClient.signIn.email({
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

    if (signInError) {
      setError(signInError.message || "An error occurred during sign in");
    }
    setIsLoading(false);
  };

  const handleDemoLogin = async () => {
    const demoEmail = "demo@policylens.app";
    const demoPassword = "Password123!";
    setEmail(demoEmail);
    setPassword(demoPassword);
    setIsLoading(true);
    setError(null);

    await authClient.signIn.email({
      email: demoEmail,
      password: demoPassword,
      fetchOptions: {
        onSuccess: () => {
          router.push("/dashboard");
          router.refresh();
        },
        onError: (ctx) => {
          setError(ctx.error.message);
          setIsLoading(false);
        },
      },
    });
  };

  return (
    <div className="flex flex-1 items-center justify-center p-4 min-h-[calc(100vh-4rem)]">
      <Card className="w-full max-w-md shadow-xl border border-default-200">
        <CardHeader className="flex flex-col gap-1 items-center px-8 pt-8 pb-4">
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-sm text-default-500">Sign in to your account</p>
        </CardHeader>
        <CardContent className="px-8 pb-8 flex flex-col gap-4">
          <form className="flex flex-col gap-4" onSubmit={handleLogin}>
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
                placeholder="Enter your password"
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
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="flex items-center gap-4 py-2">
            <div className="flex-1 h-px bg-default-200" />
            <p className="text-sm text-default-500">OR</p>
            <div className="flex-1 h-px bg-default-200" />
          </div>

          <button
            type="button"
            onClick={handleDemoLogin}
            disabled={isLoading}
            className="w-full px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold"
          >
            Login as Demo User
          </button>

          <p className="text-center text-sm text-default-500">
            Don&apos;t have an account?{" "}
            <NextLink href="/register" className="text-primary text-sm font-medium hover:underline">
              Sign up
            </NextLink>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
