import React, { ReactNode } from "react";

export const dynamic = "force-static";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="flex min-h-[100dvh] flex-col overflow-x-hidden antialiased bg-gray-100">
        {children}
      </div>
    </>
  );
};

export default Layout;
