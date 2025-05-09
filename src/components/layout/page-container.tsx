import React, { ReactNode } from "react";
import { ScrollArea } from "../ui/scroll-area";

export default function PageContainer({
  children,
  scrollable = true,
}: {
  children: React.ReactNode;
  scrollable?: boolean;
}) {
  return (
    <>
      {scrollable ? (
        <ScrollArea className="h-[calc(95dvh-30px)]">
          <div className="h-full p-4 md:px-8">{children}</div>
        </ScrollArea>
      ) : (
        <div className="h-full p-5">{children}</div>
      )}
    </>
  );
}