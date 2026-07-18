"use client";

import { useState } from "react";
import { Card, CardHeader, Input, Button, Link } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

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
    // Fill the state so the user sees it (optional, but good for demo)
    const demoEmail = "demo@policylens.app";
    const demoPassword = "Password123!";
    setEmail(demoEmail);
    setPassword(demoPassword);

    setIsLoading(true);
    setError(null);

    // Call Better Auth to login with these credentials
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
    <div className="flex flex-1 items-center justify-center p-4">
      <Card className="w-full max-w-md p-4">
        <CardHeader className="flex flex-col gap-1 items-center">
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-sm text-default-500">Sign in to your account</p>
        </CardHeader>
        <Card.Content>
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

            {error && <p className="text-sm text-danger">{error}</p>}

            <Button
              variant="primary"
              type="submit"
              isDisabled={isLoading}
              className="mt-2"
            >
              Sign In
            </Button>
          </form>

          <div className="flex items-center gap-4 py-4">
            <div className="flex-1 h-px bg-default-200" />
            <p className="text-sm text-default-500">OR</p>
            <div className="flex-1 h-px bg-default-200" />
          </div>

          <Button
            variant="secondary"
            onPress={handleDemoLogin}
            isDisabled={isLoading}
            className="w-full"
          >
            Login as Demo User
          </Button>

          <p className="text-center text-sm text-default-500 mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-sm">
              Sign up
            </Link>
          </p>
        </Card.Content>
      </Card>
    </div>
  );
}
