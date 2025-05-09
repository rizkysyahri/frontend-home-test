"use client";

import { ReactNode } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import Image from "next/image";
import { LogOut, Newspaper, Tag } from "lucide-react";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/stores/use-auth-store";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import AlertLogout from "@/components/alert-logout";
import { useGetProfile } from "@/services/api/profile";
import PageContainer from "@/components/layout/page-container";
import AlertLogoutAdmin from "@/components/alert-logout-admin";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();
  const logout = useAuthStore((state) => state.logout);
  const { data } = useGetProfile();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const sidebarLinks = [
    { href: "/dashboard/articles", label: "Article", icon: Newspaper },
    { href: "/dashboard/category", label: "Category", icon: Tag },
  ];

  return (
    <>
      <div className="w-full mx-auto md:grid md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[267px_minmax(0,1fr)]">
        <aside className="z-30 hidden h-screen w-full shrink-0 md:sticky md:top-0 md:block bg-blue-600">
          <ScrollArea className="h-full px-8 py-6 pr-6 lg:py-8">
            <div className="w-full">
              <div className="pb-4">
                <Image
                  src="/Logo.png"
                  alt="logo"
                  width={150}
                  height={150}
                  className="object-cover"
                />
                <div className="grid grid-flow-row auto-rows-max text-sm mt-5 gap-2">
                  {sidebarLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        `group flex w-full items-center gap-x-3 rounded-md border border-transparent px-3 py-2 text-white ${
                          pathname === link.href
                            ? "bg-blue-500"
                            : "bg-transparent hover:bg-blue-700"
                        }`
                      )}
                    >
                      <span className="w-4 h-4">
                        <link.icon className="w-4 h-4" />
                      </span>
                      {link.label}
                    </Link>
                  ))}
                  {/* <button
                    onClick={handleLogout}
                    className="group flex w-full items-center gap-x-3 rounded-md border border-transparent px-3 py-2 text-white bg-transparent hover:bg-blue-700"
                  >
                    <span className="w-4 h-4">
                      <LogOut className="w-4 h-4" />
                    </span>
                    Logout
                  </button> */}
                  <AlertLogoutAdmin onClick={handleLogout}/>
                </div>
              </div>
            </div>
          </ScrollArea>
        </aside>
        <main>
          <nav className="w-full h-14 bg-white flex items-center justify-between px-6 sticky top-0 z-20 border-b">
            <h1 className="text-lg font-semibold">Article</h1>
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
                    <Link href="/dashboard/profile">My Account</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </nav>
          <PageContainer>{children}</PageContainer>
        </main>
      </div>
    </>
  );
}
