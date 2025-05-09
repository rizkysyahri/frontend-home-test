import React, { ReactNode } from "react";

export const dynamic = "force-static";

const Layout = ({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) => {
  return (
    <>
      <div>{children}</div>
      {modal}
    </>
  );
};

export default Layout;
