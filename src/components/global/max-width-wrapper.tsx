import { cn } from "@/lib/utils";
import * as React from "react";

interface MaxWidthWrapperProps {
  className?: string;
  children: React.ReactNode;
}

const MaxWidthWrapper: React.FC<MaxWidthWrapperProps> = ({
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        "h-full mx-auto max-w-screen-xl px-2.5 md:px-20",
        className
      )}
    >
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
