"use client";

import Footer from "@/components/global/footer";
import MaxWidthWrapper from "@/components/global/max-width-wrapper";
import UserNav from "@/components/global/user-nav";
import { formatDate } from "@/lib/utils";
import { useGetArticleById, useGetArticles } from "@/services/api/article";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

type PageProps = { params: { id: string } };

const Page = ({ params }: PageProps) => {
  const { data } = useGetArticleById(params.id);
  const [randomArticles, setRandomArticles] = useState<any[]>([]);

  const { data: articlesData } = useGetArticles(
    1,
    10,
    data?.category?.id || ""
  );

  const shuffleArray = (array: any[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  useEffect(() => {
    if (articlesData?.articles && data?.category?.id) {
      const filteredArticles = articlesData.articles.filter(
        (article: any) =>
          article.category?.id === data.category.id && article.id !== params.id
      );
      const shuffled = shuffleArray(filteredArticles);
      setRandomArticles(shuffled.slice(0, 3));
    } else {
      setRandomArticles([]);
    }
  }, [articlesData, data, params.id]);

  return (
    <>
      <UserNav />
      <div>
        <MaxWidthWrapper className="flex flex-col items-center gap-2 mt-10">
          <div className="flex items-center gap-2 text-sm font-medium">
            <span className="text-slate-600">
              {data?.createdAt
                ? formatDate(data.createdAt)
                : "Tanggal tidak tersedia"}
            </span>
            <span className="border-2 rounded-full border-slate-600" />
            <span className="text-slate-600">
              Created by {data?.user?.role || "Unknown"}
            </span>
          </div>
          <h2 className="text-3xl font-semibold text-slate-900">
            {data?.title || "Judul tidak tersedia"}
          </h2>

          <div className="mt-10 w-full h-full">
            <Image
              src={
                data?.imageUrl ||
                "https://images.unsplash.com/photo-1746469435655-00d7340ec1c4?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              alt={data?.title || "Artikel"}
              width={1000}
              height={1000}
              className="object-cover w-full h-96 rounded-[12px]"
            />
          </div>

          <div className="mt-10">
            <p className="indent-8">
              {data?.content || "Konten tidak tersedia"}
            </p>
          </div>
        </MaxWidthWrapper>

        <div className="mt-10">
          <MaxWidthWrapper className="flex flex-col">
            <div>
              <h2 className="text-xl font-bold">Other articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 mt-5 gap-6">
                {randomArticles.length > 0 ? (
                  randomArticles.map((article) => (
                    <Link
                      href={`/articles/${article.id}`}
                      key={article.id}
                      className="flex flex-col gap-2"
                    >
                      <Image
                        src={
                          article.imageUrl ||
                          "https://images.unsplash.com/photo-1746469435655-00d7340ec1c4?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        }
                        alt={article.title || "Artikel"}
                        width={500}
                        height={500}
                        className="object-cover rounded-[12px]"
                      />
                      <div className="flex flex-col gap-2">
                        <span className="text-sm font-normal text-slate-600">
                          {article.createdAt
                            ? formatDate(article.createdAt)
                            : "Tanggal tidak tersedia"}
                        </span>
                        <span className="text-lg font-semibold text-slate-900">
                          {article.title || "Judul tidak tersedia"}
                        </span>
                        <p className="line-clamp-2 text-base font-normal text-slate-600">
                          {article.content?.substring(0, 100) ||
                            "Konten tidak tersedia"}
                          ...
                        </p>
                        <div className="flex items-center">
                          <div className="px-3 py-1 rounded-full bg-blue-200 text-blue-900 font-normal text-sm">
                            {article.category?.name ||
                              "Kategori tidak tersedia"}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="text-center col-span-3">
                    Tidak ada artikel dengan kategori yang sama.
                  </p>
                )}
              </div>
            </div>
          </MaxWidthWrapper>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Page;
