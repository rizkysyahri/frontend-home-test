"use client";

import React, { useCallback, useState } from "react";
import MaxWidthWrapper from "./max-width-wrapper";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { useGetProfile } from "@/services/api/profile";
import AlertLogout from "../alert-logout";
import { useAuthStore } from "@/stores/use-auth-store";
import { useRouter } from "next/navigation";

const UserNav = () => {
  const { data } = useGetProfile();
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  const handleLogout = useCallback(() => {
    logout();
    router.push("/");
  }, [router]);

  return (
    <nav className="h-14 inset-x-0 top-0 w-full border-b border-gray-200">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between">
          <Link href="/articles">
            <Image
              src="/Frame.png"
              alt="logo"
              width={150}
              height={150}
              className="object-cover"
            />
          </Link>

          <div>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-3 text-base font-medium">
                <Avatar>
                  <AvatarImage src="" />
                  <AvatarFallback>
                    {data?.username ? data?.username.charAt(0) : ""}
                  </AvatarFallback>
                </Avatar>
                <span className="underline">{data?.username}</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mt-2">
                <DropdownMenuItem>
                  <Link href="/profile">My Account</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <AlertLogout onClick={handleLogout} />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default UserNav;
