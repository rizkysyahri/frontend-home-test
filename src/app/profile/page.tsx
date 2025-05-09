"use client";

import Footer from "@/components/global/footer";
import UserNav from "@/components/global/user-nav";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useGetProfile } from "@/services/api/profile";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {
  const { data } = useGetProfile();
  const router = useRouter()

  return (
    <>
      <UserNav />
      <div className="flex flex-col gap-4 items-center justify-center min-h-screen">
        <div className="max-w-lg w-full mx-auto p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-center">User Profile</h3>
          <div className="flex justify-center mt-4">
            <Avatar className="w-16 h-16">
              <AvatarImage
                src=""
                alt="User avatar"
              />
              <AvatarFallback className="text-4xl bg-blue-100">
                {data?.username ? data?.username.charAt(0) : ""}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="flex flex-col gap-3 mt-6">
            <div className="flex items-center px-3 py-2 rounded-[6px] bg-gray-100 w-full">
              <span className="font-semibold text-base">Username</span>
              <span className="ml-5">:</span>
              <span className="mx-auto text-base font-normal">
                {data?.username}
              </span>
            </div>
            <div className="flex items-center px-3 py-2 rounded-[6px] bg-gray-100 w-full">
              <span className="font-semibold text-base">Password</span>
              <span className="ml-6">:</span>
              <span className="mx-auto text-base font-normal">Admin123</span>
            </div>
            <div className="flex items-center px-3 py-2 rounded-[6px] bg-gray-100 w-full">
              <span className="font-semibold text-base">Role</span>
              <span className="ml-[66px]">:</span>
              <span className="mx-auto text-base font-normal">
                {data?.role}
              </span>
            </div>
          </div>

          <Button size="lg" onClick={() => router.back()} className="w-full mt-6 bg-blue-600 hover:bg-blur-700">
            Back to home
          </Button>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default Page;
