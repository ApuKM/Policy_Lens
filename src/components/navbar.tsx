"use client";

import { Button, Dropdown, Avatar } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { LogOut, LayoutDashboard, Search } from "lucide-react";
import NextLink from "next/link";

export function SiteNavbar() {
  const { data: session, isPending } = authClient.useSession();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container mx-auto max-w-7xl flex h-16 items-center px-4 md:px-6">
        <NextLink href="/" className="flex items-center gap-2 text-foreground font-bold text-xl">
          <Search className="w-6 h-6 text-primary" />
          <span className="hidden sm:block">PolicyLens</span>
        </NextLink>

        <nav className="hidden sm:flex ml-6 gap-6 flex-1 justify-center">
          {session && (
            <>
              <NextLink href="/explore" className="text-sm font-medium hover:text-primary transition-colors">
                Explore
              </NextLink>
              <NextLink href="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
                Dashboard
              </NextLink>
            </>
          )}
        </nav>

        <div className="flex items-center justify-end gap-4 ml-auto">
          {isPending ? (
            <div className="w-8 h-8 rounded-full bg-default-200 animate-pulse" />
          ) : session ? (
            <Dropdown.Root>
              <Dropdown.Trigger>
                <Avatar
                  className="transition-transform cursor-pointer"
                  color="default"
                  name={session.user.name}
                  size="sm"
                  src={session.user.image ?? undefined}
                />
              </Dropdown.Trigger>
              <Dropdown.Popover placement="bottom end">
                <Dropdown.Menu aria-label="Profile Actions">
                  <Dropdown.Item key="profile" className="h-14 gap-2 text-foreground">
                    <p className="font-semibold">Signed in as</p>
                    <p className="font-semibold text-default-500">{session.user.email}</p>
                  </Dropdown.Item>
                  <Dropdown.Item key="dashboard" href="/dashboard">
                    <div className="flex items-center gap-2">
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item
                    key="logout"
                    onPress={async () => {
                      await authClient.signOut();
                      window.location.href = "/";
                    }}
                  >
                    <div className="flex items-center gap-2 text-danger">
                      <LogOut className="w-4 h-4" />
                      Log Out
                    </div>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown.Root>
          ) : (
            <>
              <NextLink href="/login" className="hidden lg:flex text-sm font-medium hover:text-primary transition-colors">
                Login
              </NextLink>
              <NextLink href="/register">
                <Button variant="primary">
                  Sign Up
                </Button>
              </NextLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
