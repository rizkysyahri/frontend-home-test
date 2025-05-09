import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="flex items-center justify-center bg-blue-600 mt-20">
      <div className="my-8 flex flex-col md:flex-row items-center gap-2">
        <Image
          src="/Logo.png"
          alt="logo"
          width={130}
          height={130}
          className="object-cover"
        />
        <span className="text-white font-normal text-base">© 2025 Blog genzet. All rights reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;
