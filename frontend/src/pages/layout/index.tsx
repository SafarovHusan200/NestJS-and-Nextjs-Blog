import React from "react";
import { LayoutProps } from "./layout.props";
import { Navbar } from "../../components/index";

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Navbar />
      <div className="container">{children}</div>
    </div>
  );
};

export default Layout;
