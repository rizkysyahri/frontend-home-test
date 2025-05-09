"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search } from "lucide-react";
import { InputDefault } from "@/components/ui/input-default";
import MaxWidthWrapper from "@/components/global/max-width-wrapper";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AlertLogout from "@/components/alert-logout";
import { useGetProfile } from "@/services/api/profile";
import { useAuthStore } from "@/stores/use-auth-store";
import { useRouter } from "next/navigation";
import Footer from "@/components/global/footer";
import ArticlePagination from "@/features/article/components/article-pagination";
import { useArticleStore } from "@/stores/use-article-store";
import { useCategoriesStore } from "@/stores/use-category-store";

export const dynamic = "force-static";

const Page = () => {
  const { data, fetchArticles, page, limit, total, loading } =
    useArticleStore();
  const { categories, fetchCategory } = useCategoriesStore();
  const { data: profile } = useGetProfile();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);

  useEffect(() => {
    if (categories?.length > 0) {
      console.log(
        "Kategori yang tersedia:",
        categories.map((cat) => ({
          id: cat.id,
          name: cat.name || "Nama tidak tersedia",
        }))
      );
    }
  }, [categories]);

  useEffect(() => {
    fetchArticles(page, limit, selectedCategory, searchQuery);
  }, [page, limit, fetchArticles, selectedCategory, searchQuery]);

  const debouncedSearch = useMemo(() => {
    let timeoutId: NodeJS.Timeout;
    return (query: string) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setSearchQuery(query);
        if (query) {
          setSelectedCategory("");
        }
      }, 500);
    };
  }, []);

  const handleLogout = useCallback(() => {
    logout();
    router.push("/");
  }, [router]);

  return (
    <>
      {/* <UserNav /> */}
      <div>
        <section className="relative w-full min-h-screen">
          <Image
            src="/designer.jpg"
            alt="Background image"
            width={1920}
            height={1080}
            className="absolute top-0 left-0 w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-blue-600 opacity-80"></div>{" "}
          <MaxWidthWrapper className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white">
            <div className="flex flex-col items-center gap-3 text-center">
              <h3 className="font-bold text-sm tracking-wide">Blog genzet</h3>
              <div className="max-w-3xl mx-auto">
                <h1 className="text-5xl font-medium leading-tight">
                  The Journal : Design Resources, Interviews, and Industry News
                </h1>
              </div>
              <h3 className="font-normal text-lg mt-2">
                Your daily dose of design insights!
              </h3>
            </div>

            <div className="flex flex-col md:flex-row items-center mt-10 w-full md:w-[80%] lg:w-1/2 bg-blue-500 bg-opacity-90 border-none p-3 rounded-lg text-neutral-900 gap-2">
              <Select
                value={selectedCategory}
                onValueChange={(val) => {
                  setSelectedCategory(val);
                  console.log(val);
                }}
              >
                <SelectTrigger className="w-full h-10 md:w-[220px] border-none focus:ring-0 bg-white text-black">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    {categories.map((category) => (
                      <>
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      </>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <div className="relative w-full">
                <InputDefault
                  type="search"
                  placeholder="Search articles"
                  className="flex w-full h-10 bg-white pl-10 text-black border-none focus:ring-0"
                  onChange={(e) => debouncedSearch(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              </div>
            </div>

            <div className="absolute top-6 left-6 flex items-center">
              <Link href="/articles">
                <Image
                  src="/Logo.png"
                  alt="logo"
                  width={150}
                  height={150}
                  className="object-cover"
                />
              </Link>
            </div>

            <div className="absolute top-6 right-6 flex items-center gap-2">
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-3 text-base font-medium">
                    <Avatar>
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-blue-100 text-neutral-900">
                        {profile?.username ? profile?.username.charAt(0) : ""}
                      </AvatarFallback>
                    </Avatar>
                    <span className="underline">{profile?.username}</span>
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
        </section>

        <section className="mt-[40px]">
          <div className="px-2.5 md:px-20 mx-auto max-w-screen-xl">
            <span>
              Showing : {data?.length || 0} of {total || 0} articles
            </span>
          </div>

          {loading ? (
            <div>loading...</div>
          ) : (
            <MaxWidthWrapper className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
              {data?.map((article) => (
                <Link
                  href={`/articles/${article.id}`}
                  key={article.id}
                  className="flex flex-col my-5 space-y-2"
                >
                  <Image
                    src="https://images.unsplash.com/photo-1746469435655-00d7340ec1c4?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="alt"
                    width={500}
                    height={500}
                    className="object-cover rounded-[12px]"
                  />
                  <span className="text-slate-600 font-normal text-sm">
                    {formatDate(article.createdAt)}
                  </span>
                  <span className="text-slate-900 font-semibold text-lg">
                    {article.title}
                  </span>
                  <p className="line-clamp-2 text-slate-600 font-normal text-base">
                    {article.content}
                  </p>
                  <div className="flex items-center">
                    <div className="px-3 py-1 rounded-full bg-blue-200 text-blue-900 font-normal text-sm">
                      {article.category.name}
                    </div>
                  </div>
                </Link>
              ))}
            </MaxWidthWrapper>
          )}

          <ArticlePagination />
        </section>
      </div>

      <Footer />
    </>
  );
};

export default Page;
