"use client";

import { Button, Dropdown, DropdownTrigger, DropdownPopover, DropdownMenu, DropdownItem, Avatar, AvatarImage, AvatarFallback } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { LogOut, LayoutDashboard, Search, Plus, BookOpen } from "lucide-react";
import NextLink from "next/link";

export function SiteNavbar() {
  const { data: session, isPending } = authClient.useSession();

  const initials = session?.user?.name
    ? session.user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  return (
    <header
      className="sticky top-0 z-40 w-full border-b backdrop-blur-md"
      style={{ background: "var(--background)" }}
    >
      <div className="container mx-auto max-w-7xl flex h-16 items-center px-4 md:px-6">
        <NextLink href="/" className="flex items-center gap-2 text-gray-200 font-bold text-xl">
          <Search className="w-6 h-6 text-gray-200" />
          <span className="hidden sm:block">PolicyLens</span>
        </NextLink>

        <nav className="hidden sm:flex ml-6 gap-6 flex-1 justify-center">
          <NextLink href="/explore" className="text-sm font-medium hover:text-primary transition-colors">
            Explore
          </NextLink>
          {session && (
            <>
              <NextLink href="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
                Dashboard
              </NextLink>
              <NextLink href="/items/manage" className="text-sm font-medium hover:text-primary transition-colors">
                My Policies
              </NextLink>
            </>
          )}
        </nav>

        <div className="flex items-center justify-end gap-4 ml-auto">
          {isPending ? (
            <div className="w-8 h-8 rounded-full bg-default-200 animate-pulse" />
          ) : session ? (
            <div className="flex items-center gap-3">
              <NextLink href="/items/add">
                <Button size="sm" className="gap-1.5 bg">
                  <Plus className="w-4 h-4" />
                  Add Policy
                </Button>
              </NextLink>
              <Dropdown>
                <DropdownTrigger>
                  <Avatar className="transition-transform cursor-pointer" size="sm">
                    {session.user.image ? (
                      <AvatarImage src={session.user.image} alt={session.user.name} />
                    ) : null}
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                </DropdownTrigger>
                <DropdownPopover placement="bottom end">
                  <DropdownMenu aria-label="Profile Actions">
                    <DropdownItem id="profile" className="h-14 gap-2 text-foreground">
                      <p className="font-semibold">Signed in as</p>
                      <p className="font-semibold text-default-500">{session.user.email}</p>
                    </DropdownItem>
                    <DropdownItem id="dashboard" href="/dashboard">
                      <div className="flex items-center gap-2">
                        <LayoutDashboard className="w-4 h-4" />
                        Dashboard
                      </div>
                    </DropdownItem>
                    <DropdownItem id="explore" href="/explore">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        Explore Policies
                      </div>
                    </DropdownItem>
                    <DropdownItem
                      id="logout"
                      onPress={async () => {
                        await authClient.signOut();
                        window.location.href = "/";
                      }}
                    >
                      <div className="flex items-center gap-2 text-danger">
                        <LogOut className="w-4 h-4" />
                        Log Out
                      </div>
                    </DropdownItem>
                  </DropdownMenu>
                </DropdownPopover>
              </Dropdown>
            </div>
          ) : (
            <>
              <NextLink href="/login" className="hidden lg:flex text-sm font-medium hover:text-primary transition-colors">
                Login
              </NextLink>
              <NextLink href="/register">
                <a className="px-3 py-1.5 rounded-lg bg-[#1a3a6b] text-white font-medium hover:bg-[#152f58]">Sign Up</a>
              </NextLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
