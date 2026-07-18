"use client";

import { useState } from "react";
import { Card, Input, Button, Link } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

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
    <div className="flex flex-1 items-center justify-center p-4">
      <Card className="w-full max-w-md p-4">
        <Card.Header className="flex flex-col gap-1 items-center">
          <Card.Title className="text-2xl font-bold">Create an Account</Card.Title>
          <Card.Description className="text-sm text-default-500">Sign up to get started</Card.Description>
        </Card.Header>
        <Card.Content>
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
            
            {error && <p className="text-sm text-danger">{error}</p>}
            
            <Button
              variant="primary"
              type="submit"
              disabled={isLoading}
              className="mt-2"
            >
              Sign Up
            </Button>
          </form>

          <p className="text-center text-sm text-default-500 mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-sm">
              Sign in
            </Link>
          </p>
        </Card.Content>
      </Card>
    </div>
  );
}
